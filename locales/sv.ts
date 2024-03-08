const common = {
  updated: "updated",
  slug: "slug",
  pages: {
    title: "Sidor",
    no_pages_yet: "Inga sidor ännu. Vill du skapa en?",
    getting_page: "Hämtar sida...",
    confirm_delete_message:
      "Vill du verkligen ta bort den här sidan? Den kommer inte kunna återställas igen.",
  },
  blocks: {
    title: "Blocks",
    no_blocks_yet: "Inga blocks ännu. Vill du lägga till ett?",
  },
};

export default () => {
  return {
    ...common,
  };
};
