import axios from "axios";

// api -----
// https://developer-lostark.game.onstove.com/usage-guide#API-AUCTIONS
//
// ### API status
// 200 - OK
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 415 - Unsupported Media Type
// 429 - Rate Limit Exceeded
// 502 - Bad Gateway
// 503 - Service Unavailable
// 504 - Gateway Timeout

const LOSTARK = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOSTARK_API_HOST,
});

LOSTARK.interceptors.request.use(config => {
  const lostArkJWT = process.env.NEXT_PUBLIC_LOSTARK_API_KEY;
  config.headers.Authorization = `bearer ${lostArkJWT}`;
  config.headers.Accept = "application/json";
  return config;
});

export const loaAPI = {
  // Character
  // get all characters
  getCharacters: (characterName: string) =>
    LOSTARK.get(`/characters/${characterName}/siblings`),
  // Armories
  // get characters all armories
  getArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}`),
  // get A by Armories - do not use this api(reason: Rate Limit)
  getProfilesByArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}/profiles`),
  getEquipmentByArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}/equipment`),
  getAvatarsByArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}/avatars`),
  getCombatSkillsByArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}/combat-skills`),
  getEngravingsByArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}/engravings`),
  getCardsByArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}/cards`),
  getGemsByArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}/gems`),
  getColosseumsByArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}/colosseums`),
  getCollectiblesByArmories: (characterName: string) =>
    LOSTARK.get(`/armories/characters/${characterName}/collectibles`),
  // Guild
  getGuildRankings: (serverName: string) =>
    LOSTARK.get(`/guilds/rankings?serverName=${serverName}`),
  // GameContents
  getChallengeAbyssDungeonsByGameContents: () =>
    LOSTARK.get(`/gamecontents/challenge-abyss-dungeons`),
  getChallengeGuardianRaidsByGameContents: () =>
    LOSTARK.get(`/gamecontents/challenge-guardian-raids`),
  getCalenderByGameContents: () => LOSTARK.get(`gamecontents/calendar`),
  // Auctions - no Auctions
  // Markets - no Markets
};
