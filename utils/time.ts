export const useTimeAgo = (date: string) => {
  const timeDate = new Date(date).getTime();
  const now = new Date().getTime();
  const since = now - timeDate;
  const text = ref();

  if (since > 1000 * 60 * 60 * 24 * 30 * 12) {
    text.value =
      Math.floor(since / (1000 * 60 * 60 * 24 * 30 * 12)) + " years ago";
  } else if (since > 1000 * 60 * 60 * 24 * 30) {
    text.value = Math.floor(since / (1000 * 60 * 60 * 24 * 30)) + " months ago";
  } else if (since > 1000 * 60 * 60 * 24) {
    text.value = Math.floor(since / (1000 * 60 * 60 * 24)) + " days ago";
  } else if (since > 1000 * 60 * 60) {
    text.value = Math.floor(since / (1000 * 60 * 60)) + " hours ago";
  } else if (since > 1000 * 60) {
    text.value = Math.floor(since / (1000 * 60)) + " minutes ago";
  } else if (since > 1000) {
    text.value = Math.floor(since / 1000) + " seconds ago";
  }

  return text.value;
};
