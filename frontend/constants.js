export const CHOOSE_PLAYERS = 'CHOOSE_PLAYERS';
export const NAME_PLAYERS = 'NAME_PLAYERS';
export const BOARD = 'BOARD';
export const STARRED_SPACES = [4, 8, 11, 17, 21, 24, 30, 35, 40, 44, 48, 52, 56, 63, 68, 73];
export const GOD_SPACES = [1, 15, 47, 67, 75];
export const ORANGE_STARRED_SPACES = [35, 56];
export const PLAYER_COLORS = ['#92BF64', '#EAA845', '#B5405B', '#406DB2', '#B240AC', '#E5DF72'];
export const ROLL_DICE_SPEED = 300; // ms
export const ROLL_DICE_DURATION = 1000; // ms
export const CARD_CHANCE_TYPES = {
  // "anotherTurn": {
  //   method: 'anotherTurn',
  //   title: 'Take another turn'
  // },
  "allBack3Spaces": {
    method: 'allBack3Spaces',
    title: 'Everyone move back 3 spaces'
  },
  "forward5Spaces": {
    method: 'forward5Spaces',
    title: 'Move forward 5 spaces'
  },
  "back2Spaces": {
    method: 'back2Spaces',
    title: 'Move back 2 spaces'
  },
  "moveToNextGod": {
    method: 'moveToNextGod',
    title: 'Move forward to the nearest God'
  }
};
