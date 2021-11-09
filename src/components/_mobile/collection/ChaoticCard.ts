import { Card } from "../../common/definitions";

export type statsType = "avg" | "min" | "max";

export interface chaoticCardProps<T extends Card> {
    card: T
    ext: boolean
    stats: statsType
    hideStats: boolean
  }

export interface ChaoticCard<T extends Card> {
    (props: chaoticCardProps<T>): JSX.Element
}
