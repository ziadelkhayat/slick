// Generated from the current back office (index.html): sidebar, tabs, titles, icons and header buttons of every screen.
export type SideItem = { href: string | null; text: string; svg: string };
export type Tab = { id: string; text: string; svg: string };
export type Screen = { title: string | null; hico: string; actions: string[]; side: string; tabs: Tab[] };

export const SIDE: SideItem[] = [{"href": "dashboard", "text": "Dashboard", "svg": "<path d=\"M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z\"></path>"}, {"href": "orders", "text": "Orders", "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"}, {"href": "call-center", "text": "Call Center", "svg": "<path d=\"M4 14v-2a8 8 0 0 1 16 0v2\"></path><rect x=\"2\" y=\"14\" width=\"5\" height=\"6\" rx=\"1.5\"></rect><rect x=\"17\" y=\"14\" width=\"5\" height=\"6\" rx=\"1.5\"></rect>"}, {"href": "customers", "text": "Customers", "svg": "<circle cx=\"9\" cy=\"8\" r=\"3.5\"></circle><path d=\"M2 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5\"></path><circle cx=\"17\" cy=\"9\" r=\"2.5\"></circle><path d=\"M17 14.5c2.5 0 4.3 1.6 5 4\"></path>"}, {"href": "sales-reports", "text": "Reports", "svg": "<path d=\"M3 17l6-6 4 4 8-8\"></path><path d=\"M15 7h6v6\"></path>"}, {"href": "inv-items", "text": "Inventory", "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"}, {"href": null, "text": "Menu", "svg": "<path d=\"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z\"></path><path d=\"M4 21V5M8 7h7\"></path>"}, {"href": "categories", "text": "Menu Builder", "svg": "<path d=\"M12 3l9 5-9 5-9-5z\"></path><path d=\"M3 13l9 5 9-5\"></path>"}, {"href": "branch-menu", "text": "Sales Channels", "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"}, {"href": "online-ordering", "text": "Web Ordering", "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18\"></path>"}, {"href": "users", "text": "Manage", "svg": "<circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.7 4.4V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z\"></path>"}, {"href": "discounts", "text": "Marketing", "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"}, {"href": "marketplace", "text": "Marketplace", "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"}];

export const SCREENS: Record<string, Screen> = {
 "dashboard": {
  "title": null,
  "hico": "",
  "actions": [],
  "side": "dashboard",
  "tabs": []
 },
 "orders": {
  "title": "Orders",
  "hico": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>",
  "actions": [
   "Export CSV"
  ],
  "side": "orders",
  "tabs": []
 },
 "call-center": {
  "title": "Call Center",
  "hico": "<path d=\"M4 14v-2a8 8 0 0 1 16 0v2\"></path><rect x=\"2\" y=\"14\" width=\"5\" height=\"6\" rx=\"1.5\"></rect><rect x=\"17\" y=\"14\" width=\"5\" height=\"6\" rx=\"1.5\"></rect>",
  "actions": [
   "New Call Center Order"
  ],
  "side": "call-center",
  "tabs": []
 },
 "customers": {
  "title": "Customers",
  "hico": "<circle cx=\"9\" cy=\"8\" r=\"3.5\"></circle><path d=\"M2 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5\"></path><circle cx=\"17\" cy=\"9\" r=\"2.5\"></circle><path d=\"M17 14.5c2.5 0 4.3 1.6 5 4\"></path>",
  "actions": [
   "Import / Export ▾",
   "Add Customer"
  ],
  "side": "customers",
  "tabs": []
 },
 "sales-reports": {
  "title": "Sales Reports",
  "hico": "<path d=\"M4 20V10M10 20V4M16 20v-7M22 20H2\"></path>",
  "actions": [],
  "side": "sales-reports",
  "tabs": [
   {
    "id": "sales-reports",
    "text": "Sales Reports",
    "svg": "<path d=\"M4 20V10M10 20V4M16 20v-7M22 20H2\"></path>"
   },
   {
    "id": "inventory-reports",
    "text": "Inventory Reports",
    "svg": "<path d=\"M21 12A9 9 0 1 1 12 3v9z\"></path><path d=\"M15 3.5A9 9 0 0 1 20.5 9H15z\"></path>"
   },
   {
    "id": "business-reports",
    "text": "Business Reports",
    "svg": "<path d=\"M3 17l6-6 4 4 8-8\"></path><path d=\"M15 7h6v6\"></path>"
   },
   {
    "id": "analysis-reports",
    "text": "Analysis Reports",
    "svg": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect><path d=\"M3 9h18M9 21V9\"></path>"
   }
  ]
 },
 "inventory-reports": {
  "title": "Inventory Reports",
  "hico": "<path d=\"M21 12A9 9 0 1 1 12 3v9z\"></path><path d=\"M15 3.5A9 9 0 0 1 20.5 9H15z\"></path>",
  "actions": [],
  "side": "sales-reports",
  "tabs": [
   {
    "id": "sales-reports",
    "text": "Sales Reports",
    "svg": "<path d=\"M4 20V10M10 20V4M16 20v-7M22 20H2\"></path>"
   },
   {
    "id": "inventory-reports",
    "text": "Inventory Reports",
    "svg": "<path d=\"M21 12A9 9 0 1 1 12 3v9z\"></path><path d=\"M15 3.5A9 9 0 0 1 20.5 9H15z\"></path>"
   },
   {
    "id": "business-reports",
    "text": "Business Reports",
    "svg": "<path d=\"M3 17l6-6 4 4 8-8\"></path><path d=\"M15 7h6v6\"></path>"
   },
   {
    "id": "analysis-reports",
    "text": "Analysis Reports",
    "svg": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect><path d=\"M3 9h18M9 21V9\"></path>"
   }
  ]
 },
 "business-reports": {
  "title": "Business Reports",
  "hico": "<path d=\"M3 17l6-6 4 4 8-8\"></path><path d=\"M15 7h6v6\"></path>",
  "actions": [],
  "side": "sales-reports",
  "tabs": [
   {
    "id": "sales-reports",
    "text": "Sales Reports",
    "svg": "<path d=\"M4 20V10M10 20V4M16 20v-7M22 20H2\"></path>"
   },
   {
    "id": "inventory-reports",
    "text": "Inventory Reports",
    "svg": "<path d=\"M21 12A9 9 0 1 1 12 3v9z\"></path><path d=\"M15 3.5A9 9 0 0 1 20.5 9H15z\"></path>"
   },
   {
    "id": "business-reports",
    "text": "Business Reports",
    "svg": "<path d=\"M3 17l6-6 4 4 8-8\"></path><path d=\"M15 7h6v6\"></path>"
   },
   {
    "id": "analysis-reports",
    "text": "Analysis Reports",
    "svg": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect><path d=\"M3 9h18M9 21V9\"></path>"
   }
  ]
 },
 "analysis-reports": {
  "title": "Analysis Reports",
  "hico": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect><path d=\"M3 9h18M9 21V9\"></path>",
  "actions": [],
  "side": "sales-reports",
  "tabs": [
   {
    "id": "sales-reports",
    "text": "Sales Reports",
    "svg": "<path d=\"M4 20V10M10 20V4M16 20v-7M22 20H2\"></path>"
   },
   {
    "id": "inventory-reports",
    "text": "Inventory Reports",
    "svg": "<path d=\"M21 12A9 9 0 1 1 12 3v9z\"></path><path d=\"M15 3.5A9 9 0 0 1 20.5 9H15z\"></path>"
   },
   {
    "id": "business-reports",
    "text": "Business Reports",
    "svg": "<path d=\"M3 17l6-6 4 4 8-8\"></path><path d=\"M15 7h6v6\"></path>"
   },
   {
    "id": "analysis-reports",
    "text": "Analysis Reports",
    "svg": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect><path d=\"M3 9h18M9 21V9\"></path>"
   }
  ]
 },
 "inv-items": {
  "title": "Inventory Products",
  "hico": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>",
  "actions": [
   "Import / Export ▾",
   "Create Product"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "inv-categories": {
  "title": "Inventory Categories",
  "hico": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>",
  "actions": [
   "Create Category"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "suppliers": {
  "title": "Suppliers",
  "hico": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>",
  "actions": [
   "Create Supplier"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "warehouses": {
  "title": "Locations",
  "hico": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>",
  "actions": [
   "Create Location"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "inventory-count": {
  "title": "Inventory Count",
  "hico": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>",
  "actions": [],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "production": {
  "title": "Production",
  "hico": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>",
  "actions": [
   "New Production"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "quantity-adjustments": {
  "title": "Quantity Adjustment",
  "hico": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>",
  "actions": [
   "New Quantity Adjustment"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "cost-adjustments": {
  "title": "Cost Adjustment",
  "hico": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>",
  "actions": [
   "New Cost Adjustment"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "order-transactions": {
  "title": "Order Transactions",
  "hico": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>",
  "actions": [],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "spot-check": {
  "title": "Inventory Spot Check",
  "hico": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>",
  "actions": [
   "New Inventory Spot Check"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "count-sheets": {
  "title": "Count Sheet",
  "hico": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>",
  "actions": [
   "New Inventory Count Sheet"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "po": {
  "title": "Purchase Orders",
  "hico": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>",
  "actions": [
   "New Purchase Order"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "purchase-orders": {
  "title": "Purchasing",
  "hico": "",
  "actions": [
   "New Purchasing"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Items",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "transfer-orders": {
  "title": "Transfer Orders",
  "hico": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>",
  "actions": [
   "New Transfer Order"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "transfers": {
  "title": "Transfers",
  "hico": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>",
  "actions": [
   "New Transfer"
  ],
  "side": "inv-items",
  "tabs": [
   {
    "id": "inv-items",
    "text": "Products",
    "svg": "<path d=\"M3 7l9-4 9 4v10l-9 4-9-4z\"></path><path d=\"M3 7l9 4 9-4M12 11v10\"></path>"
   },
   {
    "id": "inv-categories",
    "text": "Inventory Categories",
    "svg": "<path d=\"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>"
   },
   {
    "id": "suppliers",
    "text": "Suppliers",
    "svg": "<path d=\"M3 6h11v10H3zM14 9h4l3 3v4h-7\"></path><circle cx=\"7\" cy=\"18\" r=\"2\"></circle><circle cx=\"17\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "warehouses",
    "text": "Warehouses",
    "svg": "<path d=\"M3 21V8l9-5 9 5v13\"></path><path d=\"M7 21v-8h10v8M7 17h10\"></path>"
   },
   {
    "id": "inventory-count",
    "text": "Inventory Count",
    "svg": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"></rect><path d=\"M8 8h8M8 12h8M8 16h5\"></path>"
   },
   {
    "id": "production",
    "text": "Production",
    "svg": "<path d=\"M3 21V10l6 4V10l6 4V6l6 3v12z\"></path><path d=\"M7 17h2M12 17h2M17 17h2\"></path>"
   },
   {
    "id": "quantity-adjustments",
    "text": "Quantity Adjustment",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "cost-adjustments",
    "text": "Cost Adjustment",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "order-transactions",
    "text": "Order Transactions",
    "svg": "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z\"></path><path d=\"M9 8h6M9 12h6\"></path>"
   },
   {
    "id": "spot-check",
    "text": "Inventory Spot Check",
    "svg": "<circle cx=\"11\" cy=\"11\" r=\"7\"></circle><path d=\"M20 20l-3.5-3.5\"></path>"
   },
   {
    "id": "count-sheets",
    "text": "Count Sheet",
    "svg": "<path d=\"M8 6h13M8 12h13M8 18h13\"></path><circle cx=\"3.5\" cy=\"6\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"12\" r=\"1\"></circle><circle cx=\"3.5\" cy=\"18\" r=\"1\"></circle>"
   },
   {
    "id": "po",
    "text": "Purchase Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "purchase-orders",
    "text": "Purchasing",
    "svg": "<path d=\"M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6\"></path><circle cx=\"10\" cy=\"20\" r=\"1\"></circle><circle cx=\"17\" cy=\"20\" r=\"1\"></circle>"
   },
   {
    "id": "transfer-orders",
    "text": "Transfer Orders",
    "svg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"></rect><path d=\"M9 4V3h6v1M9 11h6M9 15h4\"></path>"
   },
   {
    "id": "transfers",
    "text": "Transfers",
    "svg": "<path d=\"M7 4L3 8l4 4\"></path><path d=\"M3 8h14\"></path><path d=\"M17 20l4-4-4-4\"></path><path d=\"M21 16H7\"></path>"
   }
  ]
 },
 "branch-menu": {
  "title": "Sales Channels",
  "hico": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>",
  "actions": [],
  "side": "branch-menu",
  "tabs": []
 },
 "categories": {
  "title": "Categories",
  "hico": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect>",
  "actions": [
   "Create Category"
  ],
  "side": "categories",
  "tabs": [
   {
    "id": "categories",
    "text": "Categories",
    "svg": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect>"
   },
   {
    "id": "products",
    "text": "Items",
    "svg": "<path d=\"M5 3v8a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 4-3 7h3v11\"></path>"
   },
   {
    "id": "variants",
    "text": "Variants",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "modifiers",
    "text": "Modifiers",
    "svg": "<path d=\"M12 3l9 5-9 5-9-5z\"></path><path d=\"M3 13l9 5 9-5\"></path>"
   },
   {
    "id": "combos",
    "text": "Combos",
    "svg": "<rect x=\"3\" y=\"8\" width=\"8\" height=\"12\" rx=\"2\"></rect><path d=\"M13 12h8l-1 8h-6z\"></path><path d=\"M5 8l1-5h2\"></path>"
   },
   {
    "id": "allergens",
    "text": "Allergens",
    "svg": "<path d=\"M12 3l10 18H2z\"></path><path d=\"M12 10v4M12 17.5h.01\"></path>"
   }
  ]
 },
 "products": {
  "title": "Items",
  "hico": "<path d=\"M5 3v8a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 4-3 7h3v11\"></path>",
  "actions": [
   "Import / Export ▾",
   "Create Item"
  ],
  "side": "categories",
  "tabs": [
   {
    "id": "categories",
    "text": "Categories",
    "svg": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect>"
   },
   {
    "id": "products",
    "text": "Items",
    "svg": "<path d=\"M5 3v8a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 4-3 7h3v11\"></path>"
   },
   {
    "id": "variants",
    "text": "Variants",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "modifiers",
    "text": "Modifiers",
    "svg": "<path d=\"M12 3l9 5-9 5-9-5z\"></path><path d=\"M3 13l9 5 9-5\"></path>"
   },
   {
    "id": "combos",
    "text": "Combos",
    "svg": "<rect x=\"3\" y=\"8\" width=\"8\" height=\"12\" rx=\"2\"></rect><path d=\"M13 12h8l-1 8h-6z\"></path><path d=\"M5 8l1-5h2\"></path>"
   },
   {
    "id": "allergens",
    "text": "Allergens",
    "svg": "<path d=\"M12 3l10 18H2z\"></path><path d=\"M12 10v4M12 17.5h.01\"></path>"
   }
  ]
 },
 "variants": {
  "title": "Variants",
  "hico": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>",
  "actions": [
   "Create Variant"
  ],
  "side": "categories",
  "tabs": [
   {
    "id": "categories",
    "text": "Categories",
    "svg": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect>"
   },
   {
    "id": "products",
    "text": "Items",
    "svg": "<path d=\"M5 3v8a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 4-3 7h3v11\"></path>"
   },
   {
    "id": "variants",
    "text": "Variants",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "modifiers",
    "text": "Modifiers",
    "svg": "<path d=\"M12 3l9 5-9 5-9-5z\"></path><path d=\"M3 13l9 5 9-5\"></path>"
   },
   {
    "id": "combos",
    "text": "Combos",
    "svg": "<rect x=\"3\" y=\"8\" width=\"8\" height=\"12\" rx=\"2\"></rect><path d=\"M13 12h8l-1 8h-6z\"></path><path d=\"M5 8l1-5h2\"></path>"
   },
   {
    "id": "allergens",
    "text": "Allergens",
    "svg": "<path d=\"M12 3l10 18H2z\"></path><path d=\"M12 10v4M12 17.5h.01\"></path>"
   }
  ]
 },
 "modifiers": {
  "title": "Modifiers Groups",
  "hico": "<path d=\"M12 3l9 5-9 5-9-5z\"></path><path d=\"M3 13l9 5 9-5\"></path>",
  "actions": [
   "Import / Export ▾",
   "Create Modifier"
  ],
  "side": "categories",
  "tabs": [
   {
    "id": "categories",
    "text": "Categories",
    "svg": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect>"
   },
   {
    "id": "products",
    "text": "Items",
    "svg": "<path d=\"M5 3v8a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 4-3 7h3v11\"></path>"
   },
   {
    "id": "variants",
    "text": "Variants",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "modifiers",
    "text": "Modifiers",
    "svg": "<path d=\"M12 3l9 5-9 5-9-5z\"></path><path d=\"M3 13l9 5 9-5\"></path>"
   },
   {
    "id": "combos",
    "text": "Combos",
    "svg": "<rect x=\"3\" y=\"8\" width=\"8\" height=\"12\" rx=\"2\"></rect><path d=\"M13 12h8l-1 8h-6z\"></path><path d=\"M5 8l1-5h2\"></path>"
   },
   {
    "id": "allergens",
    "text": "Allergens",
    "svg": "<path d=\"M12 3l10 18H2z\"></path><path d=\"M12 10v4M12 17.5h.01\"></path>"
   }
  ]
 },
 "combos": {
  "title": null,
  "hico": "",
  "actions": [],
  "side": "categories",
  "tabs": [
   {
    "id": "categories",
    "text": "Categories",
    "svg": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect>"
   },
   {
    "id": "products",
    "text": "Items",
    "svg": "<path d=\"M5 3v8a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 4-3 7h3v11\"></path>"
   },
   {
    "id": "variants",
    "text": "Variants",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "modifiers",
    "text": "Modifiers",
    "svg": "<path d=\"M12 3l9 5-9 5-9-5z\"></path><path d=\"M3 13l9 5 9-5\"></path>"
   },
   {
    "id": "combos",
    "text": "Combos",
    "svg": "<rect x=\"3\" y=\"8\" width=\"8\" height=\"12\" rx=\"2\"></rect><path d=\"M13 12h8l-1 8h-6z\"></path><path d=\"M5 8l1-5h2\"></path>"
   },
   {
    "id": "allergens",
    "text": "Allergens",
    "svg": "<path d=\"M12 3l10 18H2z\"></path><path d=\"M12 10v4M12 17.5h.01\"></path>"
   }
  ]
 },
 "allergens": {
  "title": "Allergens",
  "hico": "<path d=\"M12 3l10 18H2z\"></path><path d=\"M12 10v4M12 17.5h.01\"></path>",
  "actions": [],
  "side": "categories",
  "tabs": [
   {
    "id": "categories",
    "text": "Categories",
    "svg": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"></rect>"
   },
   {
    "id": "products",
    "text": "Items",
    "svg": "<path d=\"M5 3v8a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 4-3 7h3v11\"></path>"
   },
   {
    "id": "variants",
    "text": "Variants",
    "svg": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>"
   },
   {
    "id": "modifiers",
    "text": "Modifiers",
    "svg": "<path d=\"M12 3l9 5-9 5-9-5z\"></path><path d=\"M3 13l9 5 9-5\"></path>"
   },
   {
    "id": "combos",
    "text": "Combos",
    "svg": "<rect x=\"3\" y=\"8\" width=\"8\" height=\"12\" rx=\"2\"></rect><path d=\"M13 12h8l-1 8h-6z\"></path><path d=\"M5 8l1-5h2\"></path>"
   },
   {
    "id": "allergens",
    "text": "Allergens",
    "svg": "<path d=\"M12 3l10 18H2z\"></path><path d=\"M12 10v4M12 17.5h.01\"></path>"
   }
  ]
 },
 "online-ordering": {
  "title": "Web Ordering",
  "hico": "<circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.7 4.4V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z\"></path>",
  "actions": [
   "Open page",
   "Save"
  ],
  "side": "online-ordering",
  "tabs": [
   {
    "id": "online-ordering",
    "text": "Settings",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.7 4.4V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z\"></path>"
   },
   {
    "id": "delivery-zones",
    "text": "Delivery Zones",
    "svg": "<path d=\"M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z\"></path><circle cx=\"12\" cy=\"10\" r=\"2.5\"></circle>"
   },
   {
    "id": "delivery-charges",
    "text": "Delivery Charges",
    "svg": "<circle cx=\"5.5\" cy=\"17\" r=\"3.5\"></circle><circle cx=\"18.5\" cy=\"17\" r=\"3.5\"></circle><path d=\"M15 6h2.5l1 11M5.5 17 9 10h7.5l-4 7M8 6h3l1.5 4\"></path>"
   }
  ]
 },
 "delivery-zones": {
  "title": "Delivery Zones",
  "hico": "<path d=\"M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z\"></path><circle cx=\"12\" cy=\"10\" r=\"2.5\"></circle>",
  "actions": [
   "Create Delivery Zone"
  ],
  "side": "online-ordering",
  "tabs": [
   {
    "id": "online-ordering",
    "text": "Settings",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.7 4.4V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z\"></path>"
   },
   {
    "id": "delivery-zones",
    "text": "Delivery Zones",
    "svg": "<path d=\"M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z\"></path><circle cx=\"12\" cy=\"10\" r=\"2.5\"></circle>"
   },
   {
    "id": "delivery-charges",
    "text": "Delivery Charges",
    "svg": "<circle cx=\"5.5\" cy=\"17\" r=\"3.5\"></circle><circle cx=\"18.5\" cy=\"17\" r=\"3.5\"></circle><path d=\"M15 6h2.5l1 11M5.5 17 9 10h7.5l-4 7M8 6h3l1.5 4\"></path>"
   }
  ]
 },
 "delivery-charges": {
  "title": "Delivery Charges",
  "hico": "<circle cx=\"5.5\" cy=\"17\" r=\"3.5\"></circle><circle cx=\"18.5\" cy=\"17\" r=\"3.5\"></circle><path d=\"M15 6h2.5l1 11M5.5 17 9 10h7.5l-4 7M8 6h3l1.5 4\"></path>",
  "actions": [],
  "side": "online-ordering",
  "tabs": [
   {
    "id": "online-ordering",
    "text": "Settings",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.7 4.4V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z\"></path>"
   },
   {
    "id": "delivery-zones",
    "text": "Delivery Zones",
    "svg": "<path d=\"M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z\"></path><circle cx=\"12\" cy=\"10\" r=\"2.5\"></circle>"
   },
   {
    "id": "delivery-charges",
    "text": "Delivery Charges",
    "svg": "<circle cx=\"5.5\" cy=\"17\" r=\"3.5\"></circle><circle cx=\"18.5\" cy=\"17\" r=\"3.5\"></circle><path d=\"M15 6h2.5l1 11M5.5 17 9 10h7.5l-4 7M8 6h3l1.5 4\"></path>"
   }
  ]
 },
 "users": {
  "title": "Users",
  "hico": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>",
  "actions": [
   "Add User"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "roles": {
  "title": "Roles",
  "hico": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>",
  "actions": [
   "Create Role"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "brands": {
  "title": "Brands",
  "hico": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>",
  "actions": [
   "Create Brand"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "branches": {
  "title": "Branches",
  "hico": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>",
  "actions": [
   "Create Branch"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "devices": {
  "title": "Devices",
  "hico": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>",
  "actions": [
   "Create Device"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "taxes": {
  "title": "Taxes & Groups",
  "hico": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>",
  "actions": [
   "Create Tax"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "currency": {
  "title": "Currency",
  "hico": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>",
  "actions": [
   "Save"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "payment-methods": {
  "title": "Payment Methods",
  "hico": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>",
  "actions": [
   "Create Payment Method"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "order-sources": {
  "title": "Order Sources",
  "hico": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>",
  "actions": [
   "Create Order Source"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "charges": {
  "title": "Charges",
  "hico": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>",
  "actions": [
   "Create Charge"
  ],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "kitchen-flows": {
  "title": null,
  "hico": "",
  "actions": [],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "reasons": {
  "title": "Reasons",
  "hico": "<path d=\"M4 5h16v11H8l-4 4z\"></path>",
  "actions": [],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "tags": {
  "title": "Tags",
  "hico": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>",
  "actions": [],
  "side": "users",
  "tabs": [
   {
    "id": "users",
    "text": "Users",
    "svg": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4.2-6 8-6s7 2 8 6\"></path>"
   },
   {
    "id": "roles",
    "text": "Roles",
    "svg": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"></path><path d=\"M9 12l2 2 4-4\"></path>"
   },
   {
    "id": "brands",
    "text": "Brands",
    "svg": "<path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path><path d=\"M5 12v9h14v-9\"></path>"
   },
   {
    "id": "branches",
    "text": "Branches",
    "svg": "<path d=\"M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z\"></path><path d=\"M9 4v14M15 6v14\"></path>"
   },
   {
    "id": "devices",
    "text": "Devices",
    "svg": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2.5\"></rect><path d=\"M11 18h2\"></path>"
   },
   {
    "id": "taxes",
    "text": "Taxes & Groups",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "currency",
    "text": "Currency",
    "svg": "<path d=\"M12 2v20\"></path><path d=\"M17 6.5c-1-1.5-2.8-2.5-5-2.5-2.8 0-5 1.5-5 3.8C7 13 17 10.5 17 16c0 2.4-2.2 4-5 4-2.4 0-4.4-1.1-5.3-2.8\"></path>"
   },
   {
    "id": "payment-methods",
    "text": "Payment Methods",
    "svg": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M2 10h20M6 15h4\"></path>"
   },
   {
    "id": "order-sources",
    "text": "Order Sources",
    "svg": "<path d=\"M4 4h16v12H5l-1 4z\"></path><path d=\"M8 9h8M8 12h5\"></path>"
   },
   {
    "id": "charges",
    "text": "Charges",
    "svg": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M12 8v8M8 12h8\"></path>"
   },
   {
    "id": "kitchen-flows",
    "text": "Kitchen Flows",
    "svg": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"></rect><path d=\"M9 6h6a3 3 0 0 1 3 3v6\"></path>"
   },
   {
    "id": "reasons",
    "text": "Reasons",
    "svg": "<path d=\"M4 5h16v11H8l-4 4z\"></path>"
   },
   {
    "id": "tags",
    "text": "Tags",
    "svg": "<path d=\"M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z\"></path><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"></circle>"
   }
  ]
 },
 "discounts": {
  "title": "Discounts",
  "hico": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>",
  "actions": [
   "Create Discount"
  ],
  "side": "discounts",
  "tabs": [
   {
    "id": "discounts",
    "text": "Discounts",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "loyalty",
    "text": "Loyalty",
    "svg": "<path d=\"M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z\"></path>"
   },
   {
    "id": "gift-cards",
    "text": "Gift Cards",
    "svg": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"></rect><path d=\"M5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z\"></path>"
   },
   {
    "id": "promotions",
    "text": "Promotions",
    "svg": "<path d=\"M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z\"></path><path d=\"M17 8a5 5 0 0 1 0 8\"></path>"
   },
   {
    "id": "coupons",
    "text": "Coupons",
    "svg": "<path d=\"M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 0 0-4V4H3z\"></path><path d=\"M13 4v16\" stroke-dasharray=\"2 2\"></path>"
   }
  ]
 },
 "loyalty": {
  "title": null,
  "hico": "",
  "actions": [],
  "side": "discounts",
  "tabs": [
   {
    "id": "discounts",
    "text": "Discounts",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "loyalty",
    "text": "Loyalty",
    "svg": "<path d=\"M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z\"></path>"
   },
   {
    "id": "gift-cards",
    "text": "Gift Cards",
    "svg": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"></rect><path d=\"M5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z\"></path>"
   },
   {
    "id": "promotions",
    "text": "Promotions",
    "svg": "<path d=\"M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z\"></path><path d=\"M17 8a5 5 0 0 1 0 8\"></path>"
   },
   {
    "id": "coupons",
    "text": "Coupons",
    "svg": "<path d=\"M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 0 0-4V4H3z\"></path><path d=\"M13 4v16\" stroke-dasharray=\"2 2\"></path>"
   }
  ]
 },
 "gift-cards": {
  "title": null,
  "hico": "",
  "actions": [],
  "side": "discounts",
  "tabs": [
   {
    "id": "discounts",
    "text": "Discounts",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "loyalty",
    "text": "Loyalty",
    "svg": "<path d=\"M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z\"></path>"
   },
   {
    "id": "gift-cards",
    "text": "Gift Cards",
    "svg": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"></rect><path d=\"M5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z\"></path>"
   },
   {
    "id": "promotions",
    "text": "Promotions",
    "svg": "<path d=\"M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z\"></path><path d=\"M17 8a5 5 0 0 1 0 8\"></path>"
   },
   {
    "id": "coupons",
    "text": "Coupons",
    "svg": "<path d=\"M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 0 0-4V4H3z\"></path><path d=\"M13 4v16\" stroke-dasharray=\"2 2\"></path>"
   }
  ]
 },
 "promotions": {
  "title": null,
  "hico": "",
  "actions": [],
  "side": "discounts",
  "tabs": [
   {
    "id": "discounts",
    "text": "Discounts",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "loyalty",
    "text": "Loyalty",
    "svg": "<path d=\"M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z\"></path>"
   },
   {
    "id": "gift-cards",
    "text": "Gift Cards",
    "svg": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"></rect><path d=\"M5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z\"></path>"
   },
   {
    "id": "promotions",
    "text": "Promotions",
    "svg": "<path d=\"M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z\"></path><path d=\"M17 8a5 5 0 0 1 0 8\"></path>"
   },
   {
    "id": "coupons",
    "text": "Coupons",
    "svg": "<path d=\"M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 0 0-4V4H3z\"></path><path d=\"M13 4v16\" stroke-dasharray=\"2 2\"></path>"
   }
  ]
 },
 "coupons": {
  "title": null,
  "hico": "",
  "actions": [],
  "side": "discounts",
  "tabs": [
   {
    "id": "discounts",
    "text": "Discounts",
    "svg": "<path d=\"M19 5L5 19\"></path><circle cx=\"7\" cy=\"7\" r=\"2.5\"></circle><circle cx=\"17\" cy=\"17\" r=\"2.5\"></circle>"
   },
   {
    "id": "loyalty",
    "text": "Loyalty",
    "svg": "<path d=\"M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z\"></path>"
   },
   {
    "id": "gift-cards",
    "text": "Gift Cards",
    "svg": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"></rect><path d=\"M5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z\"></path>"
   },
   {
    "id": "promotions",
    "text": "Promotions",
    "svg": "<path d=\"M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z\"></path><path d=\"M17 8a5 5 0 0 1 0 8\"></path>"
   },
   {
    "id": "coupons",
    "text": "Coupons",
    "svg": "<path d=\"M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 0 0-4V4H3z\"></path><path d=\"M13 4v16\" stroke-dasharray=\"2 2\"></path>"
   }
  ]
 },
 "marketplace": {
  "title": "Marketplace",
  "hico": "",
  "actions": [],
  "side": "marketplace",
  "tabs": []
 }
};
