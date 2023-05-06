import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User, Organization } from "db"
import Stripe from "stripe"

export type Role = "ADMIN" | "USER"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      orgId: Organization["id"]
      role: Role
    }
  }
}
export interface Product {
  id: string /* primary key */
  active?: boolean
  name?: string
  description?: string
  image?: string
  metadata?: Stripe.Metadata
}

export interface ProductWithPrice extends Product {
  prices?: Price[]
}

export interface Price {
  id: string /* primary key */
  product_id?: string /* foreign key to products.id */
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: Stripe.Price.Type
  interval?: Stripe.Price.Recurring.Interval
  interval_count?: number
  trial_period_days?: number | null
  metadata?: Stripe.Metadata
  products?: Product
}
