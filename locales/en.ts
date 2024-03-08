const common = {
  updated: "updated",
  slug: "slug",
  pages: {
    title: "Pages",
    no_pages_yet: "No pages yet. Go ahead and create your first page!",
    getting_page: "Getting page...",
    confirm_delete_message:
      "Do you really want to delete this page? It will not be able to be restored.",
  },
  blocks: {
    title: "Blocks",
    no_blocks_yet: "No blocks yet. Create or add existing one",
  },
};

export default () => {
  return {
    ...common,
  };
};
