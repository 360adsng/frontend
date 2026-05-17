/** Keep in sync with 360backend `src/billboard/billboard-listing.enums.ts`. */

export enum BillboardType {
  STATIC = "static",
  DIGITAL_SCREEN = "digital_screen",
  MOBILE_TRUCK = "mobile_truck",
  WALL_BRANDING = "wall_branding",
  LAMP_POST = "lamp_post",
}

export enum CreativeFulfillmentType {
  PRINT = "print",
  DIGITAL_UPLOAD = "digital_upload",
}

export const BILLBOARD_TYPE_VALUES = Object.values(
  BillboardType,
) as BillboardType[];

export const CREATIVE_FULFILLMENT_TYPE_VALUES = Object.values(
  CreativeFulfillmentType,
) as CreativeFulfillmentType[];

export const BILLBOARD_TYPE_SELECT_OPTIONS: {
  value: BillboardType;
  label: string;
}[] = [
  { value: BillboardType.STATIC, label: "Static (fixed face)" },
  { value: BillboardType.DIGITAL_SCREEN, label: "Digital screen" },
  { value: BillboardType.MOBILE_TRUCK, label: "Mobile truck / LED truck" },
  { value: BillboardType.WALL_BRANDING, label: "Wall branding" },
  { value: BillboardType.LAMP_POST, label: "Lamp post" },
];

export const CREATIVE_FULFILLMENT_SELECT_OPTIONS: {
  value: CreativeFulfillmentType;
  label: string;
}[] = [
  {
    value: CreativeFulfillmentType.PRINT,
    label: "Print / physical install (e.g. flex, vehicle wrap)",
  },
  {
    value: CreativeFulfillmentType.DIGITAL_UPLOAD,
    label: "Digital upload (screen file / video loop)",
  },
];
