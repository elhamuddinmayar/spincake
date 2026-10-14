// Spin Cake menu — transcribed from the printed menu (prices in Afghani).
// Pashto names follow the printed menu; English spelling lightly corrected; Dari added.
// To add an item: copy a line and edit it. To add a category: copy a block.
//
// Price format: [label, amount]. Labels are translated in src/i18n/translations.js (menuUi.sizes);
// a null label shows the amount alone. Piece counts use 'pcs:<n>'.

const p = (...pairs) => pairs.map(([label, value]) => ({ label, value }))
const SML = (s, m, l) => p(['small', s], ['medium', m], ['large', l])
const ML = (m, l) => p(['m', m], ['l', l])
const CUP = (c, pot) => (pot ? p(['cup', c], ['pot', pot]) : p(['cup', c]))
const one = (v) => p([null, v])

export const MENU = [
  {
    id: 'desserts',
    icon: 'cake',
    page: 6,
    name: { en: 'Desserts', ps: 'خواږه', fa: 'شیرینی‌ها' },
    items: [
      { en: 'Special Ras Malai', ps: 'سپېشل رس ملايي', fa: 'رس ملایی ویژه', prices: one(100), special: true },
      { en: 'Special Kheer', ps: 'سپېشل کهیر', fa: 'کهیر ویژه', prices: p([null, 100], [null, 150]) },
      { en: 'Special Firni', ps: 'سپېشل فیرني', fa: 'فرنی ویژه', prices: p([null, 80], [null, 50]) },
      { en: 'Sohan Halwa', ps: 'سوهن حلوا', fa: 'سوهن حلوا', prices: one(100) },
      { en: 'Chocolate Pastry', ps: 'چاکلېټ پیسټري', fa: 'پیستری چاکلیتی', prices: one(70) },
      { en: 'Zardak Halwa', ps: 'د ګازرو حلوا', fa: 'حلوای زردک', prices: one(100) },
      { en: 'Cheese Cake', ps: 'چیز کېک', fa: 'چیزکیک', prices: one(70) },
      { en: 'Honey Cake', ps: 'د شاتو کېک', fa: 'کیک عسل', prices: one(100) },
      { en: 'Milky Cake', ps: 'د شیدو کېک', fa: 'کیک شیری', prices: one(80) },
      { en: 'Lava Cake', ps: 'لاوا کېک', fa: 'لاوا کیک', prices: one(70) },
      { en: 'Pistachio Baklava (Turkish)', ps: 'پسته بغلاوه', fa: 'بقلاوه پسته‌ای (ترکی)', prices: one(120) },
      { en: 'Walnut Baklava (Turkish)', ps: 'چارمغزي بغلاوه', fa: 'بقلاوه چارمغزی (ترکی)', prices: one(100) },
      { en: 'Gulab Jamun', ps: 'ګلاب جامن', fa: 'گلاب جامن', prices: one(100) },
      { en: 'Mix Sheer Peera', ps: 'میکس شیر پېړه', fa: 'شیر پیره مخلوط', prices: one(100) },
    ],
  },
  {
    id: 'juices',
    icon: 'juice',
    page: 4,
    name: { en: 'Juices & Shakes', ps: 'جوسونه او شېکونه', fa: 'آبمیوه و شیک' },
    items: [
      { en: 'Spin Special Juice', ps: 'سپین سپېشل جوس', fa: 'آبمیوه ویژه سپین', prices: ML(160, 220), special: true },
      { en: 'Winter Juice', ps: 'ژمني جوس', fa: 'آبمیوه زمستانی', prices: ML(180, 250) },
      { en: 'Apple Juice', ps: 'د مڼې جوس', fa: 'آب سیب', prices: ML(80, 120) },
      { en: 'Banana Shake', ps: 'د کېلې شېک', fa: 'شیک کیله', prices: ML(80, 120) },
      { en: 'Carrot Juice', ps: 'د ګازرو جوس', fa: 'آب زردک', prices: ML(60, 80) },
      { en: 'Orange Juice', ps: 'د مالټې جوس', fa: 'آب مالته', prices: ML(100, 150) },
      { en: 'Persimmon Juice', ps: 'د املوکو جوس', fa: 'آب املوک', prices: ML(80, 120) },
      { en: 'Strawberry Shake', ps: 'توت زمیني شېک', fa: 'شیک توت‌زمینی', prices: ML(100, 150) },
      { en: 'Chocolate Shake', ps: 'چاکلېټ شېک', fa: 'شیک چاکلیت', prices: ML(100, 150) },
      { en: 'Lemon Mint Juice', ps: 'لیمن مینټ جوس', fa: 'آب لیمو و نعناع', prices: ML(80, 120) },
      { en: 'Piña Colada Juice', ps: 'اناناس جوس', fa: 'آب آناناس (پیناکولادا)', prices: ML(100, 150) },
      { en: 'Watermelon Juice', ps: 'د هندوانې جوس', fa: 'آب تربوز', prices: ML(60, 80) },
      { en: 'Mango Juice', ps: 'د ام جوس', fa: 'آب آم', prices: ML(100, 120) },
      { en: 'Oreo Biscuit Shake', ps: 'اوریو بسکېټ شېک', fa: 'شیک بیسکویت اوریو', prices: ML(80, 120) },
      { en: 'Strawberry Margarita', ps: 'سټرابري مارګریټا', fa: 'مارگریتای توت‌زمینی', prices: ML(80, 120) },
      { en: 'Pineapple Margarita', ps: 'اناناس مارګریټا', fa: 'مارگریتای آناناس', prices: ML(80, 120) },
      { en: 'Banana Strawberry Shake', ps: 'کېله او توت زمیني میکس', fa: 'شیک کیله و توت‌زمینی', prices: ML(100, 150) },
      { en: 'Sweet Buttermilk', ps: 'خوږې شړومبې', fa: 'دوغ شیرین', prices: ML(80, 120) },
      { en: 'Salty Buttermilk', ps: 'تروې شړومبې', fa: 'دوغ نمکی', prices: p(['glass', 30]) },
    ],
  },
  {
    id: 'icecream',
    icon: 'icecream',
    page: 4,
    name: { en: 'Ice Creams', ps: 'آیسکریمونه', fa: 'آیسکریم' },
    items: [
      { en: 'Pistachio', ps: 'پسته‌یي آیسکریم', fa: 'آیسکریم پسته‌ای', prices: p(['scoop', 60]) },
      { en: 'Almond', ps: 'بادامي آیسکریم', fa: 'آیسکریم بادامی', prices: p(['scoop', 60]) },
      { en: 'Saffron', ps: 'زعفراني آیسکریم', fa: 'آیسکریم زعفرانی', prices: p(['scoop', 50]) },
      { en: 'Mango', ps: 'آم آیسکریم', fa: 'آیسکریم آم', prices: p(['scoop', 50]) },
      { en: 'Banana', ps: 'کېله آیسکریم', fa: 'آیسکریم کیله', prices: p(['scoop', 50]) },
      { en: 'Vanilla', ps: 'ونېله آیسکریم', fa: 'آیسکریم وانیلی', prices: p(['scoop', 50]) },
      { en: 'Chocolate', ps: 'چاکلېټي آیسکریم', fa: 'آیسکریم چاکلیتی', prices: p(['scoop', 50]) },
      { en: 'Strawberry', ps: 'توتِ زمیني آیسکریم', fa: 'آیسکریم توت‌زمینی', prices: p(['scoop', 50]) },
    ],
  },
  {
    id: 'tea',
    icon: 'cup',
    page: 5,
    name: { en: 'Coffee & Tea', ps: 'کافي او چای', fa: 'قهوه و چای' },
    items: [
      { en: 'Hot Coffee', ps: 'ګرمه کافي', fa: 'قهوه داغ', prices: CUP(80) },
      { en: 'Cold Coffee', ps: 'سړه کافي', fa: 'قهوه سرد', prices: CUP(80) },
      { en: 'Cappuccino', ps: 'کپه‌چینو کافي', fa: 'کاپوچینو', prices: CUP(80) },
      { en: 'Latte', ps: 'لاټې کافي', fa: 'لاته', prices: CUP(80) },
      { en: 'Black Coffee', ps: 'بلک کافي', fa: 'قهوه سیاه', prices: CUP(80) },
      { en: 'Special Shir Chai (Doodh Patti)', ps: 'سپېشل شیر چای (دودپتي)', fa: 'شیرچای ویژه (دودپتی)', prices: CUP(40, 150), special: true },
      { en: 'Kashmiri Tea', ps: 'کشمیري چای', fa: 'چای کشمیری', prices: CUP(40, 150) },
      { en: 'Green Tea', ps: 'شنه چای', fa: 'چای سبز', prices: CUP(20, 50) },
      { en: 'Lemon Tea', ps: 'لیمو چای', fa: 'چای لیمو', prices: CUP(30, 80) },
      { en: 'Ginger Tea', ps: 'ادرک چای', fa: 'چای زنجبیل', prices: CUP(30, 80) },
      { en: 'Saffron Tea', ps: 'زعفراني چای', fa: 'چای زعفرانی', prices: CUP(30, 80) },
      { en: 'Turkish Flavoured Tea', ps: 'ذائقه لرونکې ترکي چای', fa: 'چای ترکی طعم‌دار', prices: CUP(30, 80) },
    ],
  },
  {
    id: 'pizza',
    icon: 'pizza',
    page: 1,
    name: { en: 'Pizza', ps: 'پیتزا', fa: 'پیتزا' },
    items: [
      { en: 'Special Pizza', ps: 'سپېشل پیتزا', fa: 'پیتزای ویژه', prices: SML(400, 550, 800), special: true },
      { en: 'Chicken Pizza', ps: 'چرګ پیتزا', fa: 'پیتزای مرغ', prices: SML(350, 500, 750) },
      { en: 'BBQ Chicken Pizza', ps: 'باربیکیو پیتزا', fa: 'پیتزای باربیکیو', prices: SML(350, 500, 750) },
      { en: 'Vegetable Pizza', ps: 'سبزي پیتزا', fa: 'پیتزای سبزیجات', prices: SML(350, 500, 750) },
      { en: 'Tuna Pizza', ps: 'ټونا پیتزا', fa: 'پیتزای تن ماهی', prices: SML(350, 500, 750) },
      { en: '4 Season Pizza', ps: '۴ فصله پیتزا', fa: 'پیتزای چهار فصل', prices: SML(350, 500, 750) },
      { en: 'Mexican Pizza', ps: 'میکسیکن پیتزا', fa: 'پیتزای مکزیکی', prices: SML(350, 500, 750) },
      { en: 'Margherita Pizza', ps: 'مارګریټا پیتزا', fa: 'پیتزای مارگریتا', prices: SML(350, 500, 750) },
      { en: 'Cheese Lovers Pizza', ps: 'چیز لَوورز پیتزا', fa: 'پیتزای چیز لاورز', prices: SML(350, 500, 750) },
      { en: 'Calzone Pizza', ps: 'کالازون پیتزا', fa: 'پیتزای کالزونه', prices: SML(350, 500, 750) },
      { en: 'Beef Pizza', ps: 'بیف پیتزا', fa: 'پیتزای گوشت گاو', prices: SML(350, 500, 750) },
      { en: 'Pepperoni Pizza', ps: 'پیپروني پیتزا', fa: 'پیتزای پپرونی', prices: SML(350, 500, 750) },
    ],
  },
  {
    id: 'fastfood',
    icon: 'burger',
    page: 2,
    name: { en: 'Fast Food', ps: 'فسټ فوډ', fa: 'فست‌فود' },
    items: [
      { en: 'Special Burger', ps: 'سپېشل برګر', fa: 'برگر ویژه', prices: one(200), special: true },
      { en: 'Beef Burger', ps: 'بیف برګر', fa: 'برگر گوشت گاو', prices: one(170) },
      { en: 'Chicken Burger', ps: 'چیکن برګر', fa: 'برگر مرغ', prices: one(160) },
      { en: 'Zinger Burger', ps: 'زینګر برګر', fa: 'زینگر برگر', prices: one(170) },
      { en: 'Jumbo Burger', ps: 'جمبو برګر', fa: 'جمبو برگر', prices: one(200) },
      { en: 'Fish Burger', ps: 'فیش برګر', fa: 'برگر ماهی', prices: one(160) },
      { en: 'Kids Burger', ps: 'کیډز برګر (د ماشومانو لپاره)', fa: 'برگر کودکان', prices: one(100) },
      { en: 'Chicken Shawarma', ps: 'چیکن شوارمه', fa: 'شاورمای مرغ', prices: p(['single', 100], ['double', 150]) },
      { en: 'Chicken Wings (normal & spicy)', ps: 'چیکن وینګز (عادي او تند)', fa: 'بال مرغ (عادی و تند)', prices: p(['pcs:8', 180], ['pcs:12', 250], ['pcs:20', 420]) },
      { en: 'Full Fried Chicken', ps: 'فول چیکن فرایډ', fa: 'مرغ سرخ‌شده کامل', prices: one(400) },
      { en: 'Half Fried Chicken', ps: 'هاف چیکن فرایډ', fa: 'نیم مرغ سرخ‌شده', prices: one(200) },
      { en: 'Chicken Piece', ps: 'چیکن پیس', fa: 'یک تکه مرغ', prices: one(100) },
      { en: 'Chicken Nuggets', ps: 'چیکن نګیټس', fa: 'ناگت مرغ', prices: p(['pcs:8', 150], ['pcs:12', 200], ['pcs:20', 350]) },
      { en: 'Full Chicken Dashi', ps: 'فول چیکن داشي', fa: 'مرغ داشی کامل', prices: one(400) },
      { en: 'Fish & Chips', ps: 'ماهي او چیپس', fa: 'ماهی و چیپس', prices: one(200) },
      { en: 'Finger Fish', ps: 'فینګر فیش', fa: 'فینگر فیش', prices: one(180) },
    ],
  },
  {
    id: 'desi',
    icon: 'pot',
    page: 3,
    name: { en: 'Pakistani & Indian', ps: 'پاکستاني او هندي', fa: 'پاکستانی و هندی' },
    items: [
      { en: 'Chicken Biryani', ps: 'چیکن برياني', fa: 'بریانی مرغ', prices: one(200) },
      { en: 'Chicken Handi', ps: 'چیکن هنډي', fa: 'هندی مرغ', prices: one(350) },
      { en: 'Chicken Karahi', ps: 'چیکن کړايي', fa: 'کرایی مرغ', prices: one(450) },
      { en: 'Mutton Karahi', ps: 'متن کړايي', fa: 'کرایی گوسفند', prices: one(500) },
      { en: 'Daal Mash', ps: 'دال ماش', fa: 'دال ماش', prices: one(200) },
      { en: 'Palak Paneer', ps: 'پالک پنېر', fa: 'پالک پنیر', prices: one(200) },
      { en: 'Daal Lahori', ps: 'لاهوري دال', fa: 'دال لاهوری', prices: one(200) },
      { en: 'Chicken Jalfrezi', ps: 'چیکن جلفریزي', fa: 'جلفریزی مرغ', prices: one(350) },
      { en: 'Chicken Manchurian', ps: 'چیکن منچوریان', fa: 'منچوریان مرغ', prices: one(350) },
      { en: 'Ginger Chicken', ps: 'جینجر چیکن', fa: 'مرغ زنجبیلی', prices: one(350) },
      { en: 'Sweet & Sour Chicken', ps: 'سویټ سور چیکن', fa: 'مرغ ترش و شیرین', prices: one(350) },
    ],
  },
  {
    id: 'chinese',
    icon: 'noodles',
    page: 3,
    name: { en: 'Chinese', ps: 'چاینیز', fa: 'چینایی' },
    items: [
      { en: 'Chicken Chowmein', ps: 'چیکن چاومین', fa: 'چاومین مرغ', prices: one(250) },
      { en: 'Vegetable Chowmein', ps: 'ویجیټیبل چاومین', fa: 'چاومین سبزیجات', prices: one(250) },
      { en: 'Beef Chowmein', ps: 'بیف چاومین', fa: 'چاومین گوشت گاو', prices: one(250) },
      { en: 'Egg Fried Rice', ps: 'ایګ فرایډ رایس', fa: 'برنج سرخ‌شده با تخم', prices: one(250) },
      { en: 'Chicken Fried Rice', ps: 'چیکن فرایډ رایس', fa: 'برنج سرخ‌شده با مرغ', prices: one(250) },
      { en: 'Vegetable Fried Rice', ps: 'ویجټیبل فرایډ رایس', fa: 'برنج سرخ‌شده با سبزیجات', prices: one(200) },
      { en: 'Chilli Fried Rice', ps: 'چیلي فرایډ رایس', fa: 'برنج سرخ‌شده با مرچ', prices: one(200) },
    ],
  },
  {
    id: 'salads',
    icon: 'salad',
    page: 6,
    name: { en: 'Salads', ps: 'سلادونه', fa: 'سلاد' },
    items: [
      { en: 'Green Salad', ps: 'ګرین سلاد', fa: 'سلاد سبز', prices: one(150) },
      { en: 'Chicken Salad', ps: 'چرګ سلاد', fa: 'سلاد مرغ', prices: one(150) },
      { en: 'Russian Salad', ps: 'روسي سلاد', fa: 'سلاد روسی', prices: one(150) },
      { en: 'Mix Fruit Salad', ps: 'میکس فروټ سلاد', fa: 'سلاد میوه مخلوط', prices: one(150) },
      { en: 'Apple Carrot Salad', ps: 'د مڼو او ګازرو سلاد', fa: 'سلاد سیب و زردک', prices: one(150) },
      { en: 'Channa Chaat', ps: 'چنه چاټ', fa: 'چنه چات', prices: one(150) },
      { en: 'Cream Fruit Chaat', ps: 'کریمي مېوه‌یي چاټ', fa: 'چات میوه با خامه', prices: one(150) },
      { en: 'Pasta Salad', ps: 'پاسته سلاد', fa: 'سلاد پاسته', prices: one(150) },
    ],
  },
  {
    id: 'starter',
    icon: 'soup',
    page: 1,
    name: { en: 'Starters', ps: 'سټارټر', fa: 'پیش‌غذا' },
    items: [
      { en: 'Vegetable Soup', ps: 'ترکاري سوپ', fa: 'سوپ سبزیجات', prices: p(['family', 150], ['small', 50]) },
      { en: 'Chicken Soup', ps: 'چرګ سوپ', fa: 'سوپ مرغ', prices: p(['family', 150], ['small', 50]) },
    ],
  },
]

// Scans of the printed menu (public/img/menu-<n>.webp)
export const MENU_PAGES = [1, 2, 3, 4, 5, 6]

export const MENU_STATS = (() => {
  const items = MENU.flatMap((c) => c.items)
  return {
    items: items.length,
    categories: MENU.length,
    minPrice: Math.min(...items.flatMap((i) => i.prices.map((x) => x.value))),
  }
})()
