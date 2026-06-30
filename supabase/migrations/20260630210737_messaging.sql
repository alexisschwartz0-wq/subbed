-- In-app messaging between a studio and an instructor. One conversation
-- per (studio, instructor) pair; either side can send messages once it
-- exists.
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios (id) on delete cascade,
  instructor_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (studio_id, instructor_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index conversations_studio_id_idx on public.conversations (studio_id);
create index conversations_instructor_id_idx on public.conversations (instructor_id);
create index messages_conversation_id_idx on public.messages (conversation_id);

-- Bump the conversation's updated_at whenever a new message lands, so
-- inboxes can sort by most recent activity.
create function public.touch_conversation()
returns trigger
language plpgsql
as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

create trigger touch_conversation_on_message
  after insert on public.messages
  for each row execute function public.touch_conversation();

alter table public.conversations enable row level security;
alter table public.messages enable row level security;

create policy "Participants can view their conversations"
  on public.conversations for select
  using (
    instructor_id = auth.uid()
    or exists (
      select 1 from public.studios
      where studios.id = conversations.studio_id
        and studios.owner_id = auth.uid()
    )
  );

create policy "Participants can start a conversation"
  on public.conversations for insert
  with check (
    instructor_id = auth.uid()
    or exists (
      select 1 from public.studios
      where studios.id = conversations.studio_id
        and studios.owner_id = auth.uid()
    )
  );

create policy "Participants can view messages in their conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
        and (
          conversations.instructor_id = auth.uid()
          or exists (
            select 1 from public.studios
            where studios.id = conversations.studio_id
              and studios.owner_id = auth.uid()
          )
        )
    )
  );

create policy "Participants can send messages in their conversations"
  on public.messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
        and (
          conversations.instructor_id = auth.uid()
          or exists (
            select 1 from public.studios
            where studios.id = conversations.studio_id
              and studios.owner_id = auth.uid()
          )
        )
    )
  );
