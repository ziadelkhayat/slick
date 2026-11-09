// Back-office menu, same structure and names as the current back office (index.html NAV).
// `id` is the screen; the old back office opens the same screen at index.html#<id>.

export type NavLeaf = { id: string; title: string };
export type NavHeading = { heading: string };
export type NavGroup = { title: string; icon: IconName; kids: (NavLeaf | NavHeading)[] };
export type NavItem = (NavLeaf & { icon: IconName }) | NavGroup;
export type IconName = "dash" | "orders" | "phone" | "users" | "chart" | "box" | "book" | "globe" | "gear" | "tag" | "store";

const L = (id: string, title: string): NavLeaf => ({ id, title });
const H = (heading: string): NavHeading => ({ heading });

export const NAV: NavItem[] = [
  { id: "dashboard", title: "Dashboard", icon: "dash" },
  { id: "orders", title: "Orders", icon: "orders" },
  { id: "call-center", title: "Call Center", icon: "phone" },
  { id: "customers", title: "Customers", icon: "users" },
  { title: "Reports", icon: "chart", kids: [L("sales-reports", "Sales Reports"), L("inventory-reports", "Inventory Reports"), L("business-reports", "Business Reports"), L("analysis-reports", "Analysis Reports")] },
  { title: "Inventory", icon: "box", kids: [
    L("inv-items", "Items"), L("inv-categories", "Inventory Categories"), L("suppliers", "Suppliers"), L("warehouses", "Warehouses"),
    L("inventory-count", "Inventory Count"), L("production", "Production"), L("quantity-adjustments", "Quantity Adjustment"),
    L("cost-adjustments", "Cost Adjustment"), L("order-transactions", "Order Transactions"), L("spot-check", "Inventory Spot Check"),
    L("count-sheets", "Count Sheet"), L("po", "Purchase Orders"), L("purchase-orders", "Purchasing"), L("transfer-orders", "Transfer Orders"), L("transfers", "Transfers"),
  ] },
  { title: "Menu", icon: "book", kids: [
    L("branch-menu", "Sales Channels"), H("Menu Builder"), L("categories", "Categories"), L("products", "Items"), L("variants", "Variants"),
    L("modifiers", "Modifiers"), L("combos", "Combos"), H("Menu Settings"), L("allergens", "Allergens"),
  ] },
  { title: "Web Ordering", icon: "globe", kids: [L("online-ordering", "Settings"), L("delivery-zones", "Delivery Zones"), L("delivery-charges", "Delivery Charges")] },
  { title: "Manage", icon: "gear", kids: [
    L("users", "Users"), L("roles", "Roles"), L("brands", "Brands"), L("branches", "Branches"), L("devices", "Devices"), L("taxes", "Taxes & Groups"),
    L("currency", "Currency"), L("payment-methods", "Payment Methods"), L("order-sources", "Order Sources"), L("charges", "Charges"),
    L("kitchen-flows", "Kitchen Flows"), L("reasons", "Reasons"), L("tags", "Tags"),
  ] },
  { title: "Marketing", icon: "tag", kids: [L("discounts", "Discounts"), L("loyalty", "Loyalty"), L("gift-cards", "Gift Cards"), L("promotions", "Promotions"), L("coupons", "Coupons")] },
  { id: "marketplace", title: "Marketplace", icon: "store" },
];

export const isGroup = (n: NavItem): n is NavGroup => "kids" in n;
export const isLeaf = (k: NavLeaf | NavHeading): k is NavLeaf => "id" in k;

export const TITLES: Record<string, string> = {};
NAV.forEach((n) => (isGroup(n) ? n.kids.filter(isLeaf).forEach((k) => (TITLES[k.id] = k.title)) : (TITLES[n.id] = n.title)));

export const groupOf = (id: string) => NAV.find((n) => isGroup(n) && n.kids.some((k) => isLeaf(k) && k.id === id)) as NavGroup | undefined;
