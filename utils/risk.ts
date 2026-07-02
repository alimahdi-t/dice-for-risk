// utils/risk.ts

export type RollResult = {
  attacker: number[];
  defender: number[];
  attackerLosses: number;
  defenderLosses: number;
};

export type BattleParams = {
  attackerTroops: number;
  defenderTroops: number;
  attackerDiceCount: number;
  defenderDiceCount: number;
};

export type BattleResult = {
  result: RollResult;
  attackerTroops: number;
  defenderTroops: number;
};

export type Winner = "attacker" | "defender" | null;

/**
 * Default values for a new battle
 */
export const DEFAULT_BATTLE = {
  attackerTroops: 10,
  defenderTroops: 10,
  attackerDice: 3,
  defenderDice: 2,
};

/**
 * Roll N dice and sort descending
 */
export const rollDice = (count: number): number[] => {
  if (count <= 0) return [];

  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * 6) + 1,
  ).sort((a, b) => b - a);
};

/**
 * Compare attacker and defender dice
 * according to Risk rules
 */
export const compareRolls = (
  attackerDice: number[],
  defenderDice: number[],
): RollResult => {
  const pairs = Math.min(attackerDice.length, defenderDice.length);

  let attackerLosses = 0;
  let defenderLosses = 0;

  for (let i = 0; i < pairs; i++) {
    if (attackerDice[i] > defenderDice[i]) {
      defenderLosses++;
    } else {
      attackerLosses++;
    }
  }

  return {
    attacker: attackerDice,
    defender: defenderDice,
    attackerLosses,
    defenderLosses,
  };
};

/**
 * Maximum attacker dice
 */
export const getMaxAttackerDice = (troops: number): number =>
  Math.max(0, Math.min(3, troops - 1));

/**
 * Maximum defender dice
 */
export const getMaxDefenderDice = (troops: number): number =>
  Math.max(0, Math.min(2, troops));

/**
 * Check if battle ended
 */
export const isBattleOver = (
  attackerTroops: number,
  defenderTroops: number,
): boolean => defenderTroops <= 0 || attackerTroops <= 1;

/**
 * Determine winner
 */
export const getWinner = (
  attackerTroops: number,
  defenderTroops: number,
): Winner => {
  if (defenderTroops <= 0) {
    return "attacker";
  }

  if (attackerTroops <= 1) {
    return "defender";
  }

  return null;
};

/**
 * Play one Risk battle round
 */
export const playBattle = ({
  attackerTroops,
  defenderTroops,
  attackerDiceCount,
  defenderDiceCount,
}: BattleParams): BattleResult => {
  const attackerDice = rollDice(attackerDiceCount);

  const defenderDice = rollDice(defenderDiceCount);

  const result = compareRolls(attackerDice, defenderDice);

  return {
    result,
    attackerTroops: attackerTroops - result.attackerLosses,
    defenderTroops: defenderTroops - result.defenderLosses,
  };
};