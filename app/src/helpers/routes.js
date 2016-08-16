export const routes = {
  root () { return '/'; },
  messages(type) { return `/messages/${type}`; },
  message(id) { return `/message/${id}`; },
  newMessage() { return '/messages/new'; }
};

export const NAV_ITEMS = [
  {
    icon: 'inbox',
    text: 'Inbox',
    href: routes.messages('inbox')
  },
  {
    icon: 'files-o',
    text: 'Draft',
    href: routes.messages('drafts')
  },
  {
    icon: 'star-o',
    text: 'Starred',
    href: routes.messages('starred')
  },
  {
    icon: 'trash-o',
    text: 'Deleted',
    href: routes.messages('deleted')
  }
];
