export const notAffiliatedText = 'not created by, affiliated with, or supported by Slack Technologies, Inc.';

export const getStickerImagePath = size => {
  return require.resolve(`../image/slack-sticker-${size}.png`);
};
