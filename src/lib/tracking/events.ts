export type TrackingEvent =
  | { name: "page_view"; page: string }
  | {
      name: "cta_click";
      page: string;
      section: string;
      button_label: string;
      destination: "whatsapp" | "form" | "internal" | "external";
    }
  | {
      name: "whatsapp_click";
      page: string;
      section: string;
      variant: "floating" | "hero" | "inline";
    }
  | { name: "form_view"; page: string; section: string }
  | { name: "form_field_focus"; page: string; field: string }
  | { name: "form_submit_attempt"; page: string; section: string }
  | {
      name: "form_submit_success";
      page: string;
      section: string;
      lead_id: string;
      tipo_projeto: string;
    }
  | { name: "form_submit_error"; page: string; section: string; error: string }
  | { name: "scroll_depth"; page: string; depth: 25 | 50 | 75 | 100 }
  | { name: "portfolio_item_click"; page: string; item_id: string }
  | {
      name: "bio_link_click";
      destination:
        | "home"
        | "corporativo"
        | "eventos"
        | "whatsapp"
        | "orcamento"
        | "pinterest";
    };

export type TrackingEventName = TrackingEvent["name"];
