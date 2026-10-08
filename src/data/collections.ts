export type Product = {
  title: string;
  handle: string;
  price: string;
  images: string[];
};

export type Collection = {
  title: string;
  compact?: boolean;
  products: Product[];
};

const CDN = "https://store.bensonboone.com/cdn/shop/files/";

const p = (title: string, handle: string, price: string, ...images: string[]): Product => ({
  title,
  handle,
  price,
  images: images.map((file) => CDN + file),
});

export const collections: Collection[] = [
  {
    title: "wanted man exclusive tour collection",
    products: [
      p("reward tee", "reward-tee", "$50.00", "BB_WANTEDMANTOUR_REWARDTEE_FRONT.png", "BB_WANTEDMANTOUR_REWARDTEE_BACK.png"),
      p("wanted man ash grey hoodie", "wanted-man-ash-grey-hoodie", "$125.00", "BB-WANTED-MAN-HOODIE-HG-FRONT_1.png", "BB-WANTED-MAN-HOODIE-HG-BACK_2.png"),
    ],
  },
  {
    title: "wanted man tour collection",
    products: [
      p("wanted man tour dateback tee", "wanted-man-tour-dateback-tee", "$50.00", "BB_WANTEDMANTOUR_ADMATTOURTEE_FRONT.png", "BB_WANTEDMANTOUR_ADMATTOURTEE_BACK.png"),
      p("wanted man dateback photo tee", "wanted-man-dateback-photo-tee", "$50.00", "BB_WANTEDMANTOUR_WORLDSMOSTINVERTEDTEE_FRONT.png", "BB_WANTEDMANTOUR_WORLDSMOSTINVERTEDTEE_BACK.png"),
      p("wanted man star tee", "wanted-man-star-tee", "$50.00", "BB_WANTEDMANTOUR_STARSCRIPTTEE_FRONT.png", "BB_WANTEDMANTOUR_STARSCRIPTTEE_BACK.png"),
      p("mugshot tour tee", "mugshot-tour-tee", "$50.00", "BB_WANTEDMANTOUR_MUGSHOTTEE_FRONT.png", "BB_WANTEDMANTOUR_MUGSHOTTEE_BACK.png"),
      p("wanted man denim jacket", "wanted-man-denim-jacket", "$150.00", "BB_WANTEDMANTOUR_WANTEDMANJACKET_BACK.png", "BB_WANTEDMANTOUR_WANTEDMANJACKET_pins_front.png"),
      p("world tour varsity crewneck", "world-tour-varsity-crewneck", "$85.00", "BB_WANTEDMANTOUR_VARSITYCREWNECK_BLUE.png", "BB_WANTEDMANTOUR_VARSITYCREWNECK_BLUE_BACK.png"),
      p("wanted man star hoodie", "wanted-man-star-hoodie", "$125.00", "BB_WANTEDMANTOUR_STARHOODIE_FRONT.png", "BB_WANTEDMANTOUR_STARHOODIE_BACK.png"),
      p("wanted man world tour hoodie", "wanted-man-world-tour-hoodie", "$125.00", "BB_WANTEDMANTOUR_WANTEDMANTOURHOODIE_02_FRONT.png", "BB_WANTEDMANTOUR_WANTEDMANTOURHOODIE_02_BACK.png"),
      p("i <3 a wanted man hat", "i-3-a-wanted-man-hat", "$40.00", "WTDENIMHATFRONT.png", "WTDENIMHATHATB.png"),
      p("wanted man photo tote", "wanted-man-photo-tote", "$35.00", "BB_WANTEDMANTOUR_WANTEDMANTOTE_FRONT.png", "BB_WANTEDMANTOUR_WANTEDMANTOTE_BACK.png"),
      p("wanted man enamel pin set", "wanted-man-enamel-pin-set", "$20.00", "BB_WANTEDMANTOUR_PINPACK.png"),
    ],
  },
  {
    title: "american heart collection",
    products: [
      p("american heart crewneck", "american-heart-crewneck", "$85.00", "B2GREYCREWNECKFRONT.png", "B2GREYCREWNECKBACK.png"),
      p("ice cream zip hoodie", "ice-cream-zip-hoodie", "$125.00", "B10GREYZIPHOODIEFRONT.png", "B10_GREY_ZIP_HOODIE_BACK_no_uk_dates.png"),
      p("american heart red hoodie", "american-heart-red-hoodie", "$125.00", "B25REDHOODIEFRONT.png", "B25REDHOODIEBACK.png"),
      p("american heart star hoodie", "american-heart-star-hoodie", "$125.00", "G385REDHOODIEFRONT.png", "G385REDHOODIEBACK.png"),
      p("american heart rhinestone tank", "american-heart-rhinestone-tank", "$50.00", "BBRHINESTONETANKUPDATED.png"),
      p("american heart dateback photo tee", "american-heart-dateback-photo-tee", "$50.00", "B32PINK_BLACKPHOTOTEEFRONT.png", "B32PINK_BLACKPHOTOTEEBACK.png"),
      p("heart dateback tee", "heart-dateback-tee", "$50.00", "G384AMERICANHEARTTOURTEEFRONT.png", "G384AMERICANHEARTTOURTEEBACK.png"),
      p("benson boone portrait tee", "benson-boone-portrait-tee", "$50.00", "B32WHITE_BLACKPHOTOTEEFRONT.png", "B32WHITE_BLACKPHOTOTEEBACK.png"),
      p("benny boone 70's tee", "benny-boone-70s-tee", "$45.00", "B970STEEFRONT.png"),
      p("american heart 2025 distressed tee", "american-heart-2025-distressed-tee", "$50.00", "B7WHITETEXTTEEFRONT.png", "B7WHITETEXTTEEBACK.png"),
      p("benny hearts tee", "benny-hearts-tee", "$45.00", "B6HEARTTEEFRONT.png", "B6HEARTTEEFRONTCLOSEUP.png"),
      p("benny boone dateback tee", "benny-boone-dateback-tee", "$50.00", "BENNYBOONESPLATTERBLACKTEEFRONT.png", "BENNYBOONESPLATTERBLACKTEEBACK.png"),
      p("salt lake city tee", "salt-lake-city-tee", "$50.00", "WANTEDTEE.png"),
      p("american heart tote", "american-heart-tote", "$35.00", "BBTOTEFRONT.png", "BBTOTEBACK.png"),
      p("benny boone's world tour hat", "benny-boones-world-tour-hat", "$40.00", "B14GREENHATFRONT.png", "B14GREENHATSIDE.png"),
      p("holiday knit zip up sweater", "holiday-knit-zip-up-sweater", "$130.00", "BB_HOLIDAY_KNIT_SWEATER_FRONT.png", "BB_HOLIDAY_KNIT_SWEATER_BACK.png"),
      p("bb terry slippers", "bb-terry-slippers", "$40.00", "BBHOLIDAYSLIPPERS.png", "BBHOLIDAYSLIPPERSside.png"),
      p("benny holiday beanie", "benny-holiday-beanie", "$40.00", "BBHOLIDAYBLUEBEANIE.png"),
    ],
  },
  {
    title: "music",
    compact: true,
    products: [
      p("american heart - red white and blue marble on translucent clear vinyl", "american-heart-red-white-and-blue-marble-on-translucent-clear-vinyl", "$29.98", "BB_AH_ProductShot_LP_Standard.png"),
      p("beautiful things 7”", "beautiful-things-7", "$9.98", "BeautifulThings7-inch.png"),
      p("fireworks & rollerblades - clear vinyl", "fireworks-rollerblades-clear-vinyl", "$29.98", "Fireworks_Rollerblades_-_Clear_vinyl.png"),
      p("american heart - cd", "american-heart-cd", "$14.98", "BB_AH_ProductShot_CD_Standard.png"),
      p("fireworks & rollerblades cd", "fireworks-rollerblades-cd", "$14.98", "BB_Fireworks_Rollerblades_2025Release_ProductShot_CD.png"),
      p("pulse cd", "pulse-cd", "$9.98", "BensonBoone_Pulse_Standard_CD.png"),
      p("walk me home cd", "walk-me-home-cd", "$9.98", "BB_WalkMeHomeEP_2026_ProductShot_CD.png"),
      p("american heart - store exclusive gold cassette", "american-heart-store-exclusive-gold-cassette", "$14.98", "BB_AH_ProductShot_Cassette_VG.png"),
      p("american heart - petrol blue cassette", "american-heart-petrol-blue-cassette", "$14.98", "BB_AH_ProductShot_Cassette_PB.png"),
    ],
  },
];

export const logos = {
  dark: CDN + "BensonBoone_Logo_Primary_black.png",
  light: CDN + "BensonBoone_Logo_Primary_a08fc5a1-6c2d-44ec-a432-6e8d0b4413e6.png",
};
