export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'burger' | 'chicken' | 'maria' | 'box' | 'mac-cheese' | 'appetizer' | 'mix-savory' | 'mix-sweet' | 'drinks' | 'sides' | 'extras' | 'sandwiches' | 'fatuta' | 'tnt';
    image: string;
};

export const CATEGORIES = [
    { id: 'burger', name: 'البرجر الأصلي', emoji: '🍔' },
    { id: 'chicken', name: 'فراخ لغوصة', emoji: '🍗' },
    { id: 'maria', name: 'ماريا لغوصة', emoji: '🌯' },
    { id: 'sandwiches', name: 'ساندوتشات', emoji: '🥪' },
    { id: 'mac-cheese', name: 'ماك أند تشيز', emoji: '🧀' },
    { id: 'fatuta', name: 'فتوتة', emoji: '💣' },
    { id: 'tnt', name: 'TNT', emoji: '🧨' },
    { id: 'box', name: 'بوكسات ووجبات', emoji: '🍱' },
    { id: 'appetizer', name: 'مقبلات', emoji: '🍟' },
    { id: 'extras', name: 'إضافات', emoji: '✨' },
    { id: 'mix-savory', name: 'ميكس حادق', emoji: '🌮' },
    { id: 'mix-sweet', name: 'ميكس الحلو', emoji: '🍯' },
    { id: 'drinks', name: 'مشروبات', emoji: '🥤' },
];

export const menuItems: MenuItem[] = [
    // Burgers (b1-b8, n1-n4, mini1-mini3)
    { id: 'b1', name: 'CLACCIC', description: 'لحم بقري + صوص 1000 جزيرة + صوص الشيدر كريمي + خس + طماطم + بصل + بطاطس متبلة', price: 110, category: 'burger', image: '' },
    { id: 'b2', name: 'CARAMELIZED', description: 'لحم بقري + صوص 1000 جزيرة + صوص الشيدر كريمي + خس + طماطم + بصل + بطاطس متبلة + جبنة + البصل المكرمل', price: 115, category: 'burger', image: '' },
    { id: 'b3', name: 'NINJA', description: 'لحم بقري + صوص 1000 جزيرة + صوص الشيدر كريمي + خس + طماطم + بصل + بطاطس متبلة + صوص باربيكيو + حلقات بصل', price: 125, category: 'burger', image: '' },
    { id: 'b4', name: 'DOUBLE CHEESY', description: 'لحم بقري + صوص 1000 جزيرة + صوص الشيدر كريمي + خس + طماطم + بصل + بطاطس متبلة + موتزاريللا ستيكس + موتزاريللا سايحة', price: 130, category: 'burger', image: '' },
    { id: 'b5', name: 'COW BOY', description: 'لحم بقري + صوص 1000 جزيرة + صوص الشيدر كريمي + خس + طماطم + بصل + صوص باربيكيو + شرائح الهوت دوج + بطاطس متبلة', price: 125, category: 'burger', image: '' },
    { id: 'b6', name: 'MUSHROOM', description: 'لحم بقري + صوص 1000 جزيرة + صوص الشيدر كريمي + خس + طماطم + بصل + الصوص المميز + شرائح المشروم + بطاطس متبلة', price: 140, category: 'burger', image: '' },
    { id: 'b7', name: 'TASTY LOVERS', description: 'لحم بقري + صوص 1000 جزيرة + صوص الشيدر كريمي + خس + طماطم + بصل + صوص التيستي الخطير + بيف بيكون + بطاطس متبلة', price: 140, category: 'burger', image: '' },
    { id: 'b8', name: 'LAVA', description: 'لحم بقري + صوص 1000 جزيرة + صوص الشيدر كريمي + خس + طماطم + بصل + صوص البافلو + شرائح الهالبينو + بطاطس متبلة', price: 120, category: 'burger', image: '' },
    { id: 'n1', name: 'BEEF ZILLA', description: 'كرافت برجر + صوص 1000 جزيرة + صوص الشيدر كريمي + شرائح البسطرمة + صوص التيستي + البطاطس المتبلة', price: 130, category: 'burger', image: '' },
    { id: 'n2', name: 'LA3WASA BOOM!!!', description: 'كرافت برجر دابل + صوص 1000 جزيرة + صوص الشيدر كريمي + شريحة لحمة + صوص الرانش + البطاطس المتبلة', price: 190, category: 'burger', image: '' },
    { id: 'n3', name: 'HAWI SMASH', description: 'سماش برجر + صوص 1000 جزيرة + صوص الشيدر كريمي + حلقات أناناس + سويت شيلي + البطاطس المتبلة', price: 135, category: 'burger', image: '' },
    { id: 'n4', name: 'BIG LA3WASA', description: 'سماش برجر دابل + صوص 1000 جزيرة + صوص تيستي + صوص الشيدر كريمي + بصل مكرمل + بيف بيكون + موتزاريللا ستيكس + البطاطس المتبلة', price: 180, category: 'burger', image: '' },
    { id: 'mini1', name: 'ميني لغوصة 1', description: '3 ميني سماش + فرايز', price: 60, category: 'burger', image: '' },
    { id: 'mini2', name: 'ميني لغوصة 2', description: 'ميني سماش + 3 ميني تشيكن + فرايز', price: 115, category: 'burger', image: '' },
    { id: 'mini3', name: 'ميني لغوصة 3', description: '3 ميني سماش + 3 ميني تشيكن + فرايز', price: 205, category: 'burger', image: '' },

    // Maria (m1-m5)
    { id: 'm1', name: 'ماريا مشكل جبن', description: 'صوص 1000 جزيرة + فلفل ألوان + طماطم + جبنة شيدر + جبنة كيري + جبنة موتزاريللا', price: 110, category: 'maria', image: '' },
    { id: 'm2', name: 'ماريا بسطرمة سجق', description: 'صوص 1000 جزيرة + فلفل ألوان + طماطم + جبنة كيري + جبنة موتزاريللا + سجق + بسطرمة', price: 135, category: 'maria', image: '' },
    { id: 'm3', name: 'ماريا سوسيس', description: 'صوص باربيكيو + فلفل ألوان + طماطم + جبنة موتزاريللا + بيبيروني + سوسيس', price: 115, category: 'maria', image: '' },
    { id: 'm4', name: 'ماريا فاهيتا فراخ', description: 'صوص رانش + فلفل ألوان + طماطم + جبنة موتزاريللا + بصل + قطع فراخ', price: 125, category: 'maria', image: '' },
    { id: 'm5', name: 'ماريا شاورما لحم', description: 'صوص رانش + فلفل ألوان + طماطم + جبنة موتزاريللا + بصل + قطع لحم', price: 130, category: 'maria', image: '' },

    // Chicken (c1-c6)
    { id: 'c1', name: 'CLACCIC CHICKEN', description: 'صدور الدجاج المقلية مع صوص الشيدر كريمي والمايونيز والبطاطس المتبلة', price: 100, category: 'chicken', image: '' },
    { id: 'c2', name: 'BUFFALO CHICKEN', description: 'صدور الدجاج المقلية مع صوص المايونيز وصوص البافلو وحلقات الهالبينو والبطاطس المتبلة', price: 110, category: 'chicken', image: '' },
    { id: 'c3', name: 'CHEESY CHICKEN', description: 'صدور الدجاج المقلية مع صوص الشيدر كريمي والمايونيز والموتزاريللا استيكس والموتزاريللا السايحة والبطاطس المتبلة', price: 125, category: 'chicken', image: '' },
    { id: 'c4', name: 'RINGO CHICKEN', description: 'صدور الدجاج المقلية مع صوص الشيدر كريمي والمايونيز وصوص الباربيكيو وحلقات البصل والبطاطس المتبلة', price: 120, category: 'chicken', image: '' },
    { id: 'c5', name: 'RANCHO CHICKEN', description: 'صدور الدجاج المقلية مع صوص الشيدر كريمي وصوص الرانش وشرائح التركي المدخن والبطاطس المتبلة', price: 130, category: 'chicken', image: '' },
    { id: 'c6', name: 'TASTY CHICKEN', description: 'صدور الدجاج المقلية مع صوص الشيدر كريمي وصوص التيستي وشرائح البسطرمة والبطاطس المتبلة', price: 145, category: 'chicken', image: '' },

    // Sandwiches (s1-s6)
    { id: 's1', name: 'French Fries', description: 'ساندوتش بطاطس محمرة', price: 40, category: 'sandwiches', image: '' },
    { id: 's2', name: 'Hot Dog', description: 'ساندوتش هوت دوج', price: 60, category: 'sandwiches', image: '' },
    { id: 's3', name: 'Grilled Chicken', description: 'ساندوتش فراخ جريل', price: 90, category: 'sandwiches', image: '' },
    { id: 's4', name: 'Super Supreme', description: 'سوبر سوبريم', price: 90, category: 'sandwiches', image: '' },
    { id: 's5', name: 'Pastrami', description: 'ساندوتش بسطرمة', price: 70, category: 'sandwiches', image: '' },
    { id: 's6', name: 'Meat Shawarma', description: 'ساندوتش شاورما لحم', price: 90, category: 'sandwiches', image: '' },

    // Mac & Cheese (mc1-mc4)
    { id: 'mc1', name: 'Mexican Mac', description: 'مكرونة ميكسيكان بالجبنة', price: 90, category: 'mac-cheese', image: '' },
    { id: 'mc2', name: 'Strips Mac', description: 'مكرونة بقطع الاستربس والجبنة', price: 105, category: 'mac-cheese', image: '' },
    { id: 'mc3', name: 'Smash Mac', description: 'مكرونة بقطع السماش برجر والجبنة', price: 110, category: 'mac-cheese', image: '' },
    { id: 'mc4', name: 'Shrimp Mac', description: 'مكرونة بالجمبري والجبنة', price: 120, category: 'mac-cheese', image: '' },

    // Fatuta (ft1-ft3)
    { id: 'ft1', name: 'Mexican Fatuta', description: 'فتوتة ميكسيكان', price: 80, category: 'fatuta', image: '' },
    { id: 'ft2', name: 'Strips Fatuta', description: 'فتوتة استربس', price: 90, category: 'fatuta', image: '' },
    { id: 'ft3', name: 'Grilled Fatuta', description: 'فتوتة جريل', price: 90, category: 'fatuta', image: '' },

    // TNT (tnt1-tnt4)
    { id: 'tnt1', name: 'Mexican TNT', description: 'تي إن تي ميكسيكان', price: 110, category: 'tnt', image: '' },
    { id: 'tnt2', name: 'Strips TNT', description: 'تي إن تي استربس', price: 125, category: 'tnt', image: '' },
    { id: 'tnt3', name: 'Smash TNT', description: 'تي إن تي سماش', price: 130, category: 'tnt', image: '' },
    { id: 'tnt4', name: 'TNT Boom', description: 'تي إن تي بوم الفظيع', price: 145, category: 'tnt', image: '' },

    // Boxes & Meals (box1-box3, ml1-ml2)
    { id: 'box1', name: 'بوكس التوفير', description: 'كلاسيك سماش + كلاسيك تشيكن + باكيت فرايز + بيج كولا', price: 180, category: 'box', image: '' },
    { id: 'box2', name: 'بوكس السينجل', description: 'كلاسيك سماش + تشيزي فرايز + بيج كولا + كريمة أوريو شيكولاتة', price: 130, category: 'box', image: '' },
    { id: 'box3', name: 'بوكس الشلة', description: 'كلاسيك سماش + مشروم سماش + كلاسيك تشيكن + رينجو تشيكن + مكسيكان فرايز + تشيزي فرايز + 4 بيج كولا', price: 440, category: 'box', image: '' },
    { id: 'ml1', name: 'Strips Meal', description: 'أرز بسمتي + 3 قطع استربس + بطاطس + صوص', price: 140, category: 'box', image: '' },
    { id: 'ml2', name: 'Grilled Meal', description: 'أرز بسمتي + 3 قطع صدور جريل + بطاطس + صوص', price: 140, category: 'box', image: '' },

    // Appetizers (ap1-ap8, lf1-lf3)
    { id: 'ap1', name: 'Fries', description: 'بطاطس محمرة', price: 35, category: 'appetizer', image: '' },
    { id: 'ap2', name: 'Cheesy Fries', description: 'بطاطس بالجبنة', price: 45, category: 'appetizer', image: '' },
    { id: 'ap3', name: 'Chicken Balls', description: 'كرات الدجاج بالجبنة (8 قطع)', price: 85, category: 'appetizer', image: '' },
    { id: 'ap4', name: 'Mozzarella Sticks', description: 'أصابع الموتزاريللا', price: 60, category: 'appetizer', image: '' },
    { id: 'ap5', name: 'Onion Rings', description: 'حلقات البصل', price: 55, category: 'appetizer', image: '' },
    { id: 'ap6', name: 'Chicken Strips', description: 'دجاج استربس', price: 105, category: 'appetizer', image: '' },
    { id: 'ap7', name: 'Chicken Caesar', description: 'سلطة سيزر بالدجاج', price: 60, category: 'appetizer', image: '' },
    { id: 'ap8', name: 'Fattoush Salad', description: 'سلطة فتوش لغوصة', price: 55, category: 'appetizer', image: '' },
    { id: 'lf1', name: 'Mexican Fries', description: 'بطاطس ميكسيكان لوديد', price: 75, category: 'appetizer', image: '' },
    { id: 'lf2', name: 'Strips Fries', description: 'بطاطس بقطع الاستربس والجبنة', price: 90, category: 'appetizer', image: '' },
    { id: 'lf3', name: 'Smash Fries', description: 'بطاطس بقطع السماش والجبنة', price: 95, category: 'appetizer', image: '' },

    // Mix Savory (ms1-ms18)
    { id: 'ms1', name: 'كيري بسطرمة', description: 'كيري بسطرمة', price: 15, category: 'mix-savory', image: '' },
    { id: 'ms2', name: 'كيري سوسيس', description: 'كيري سوسيس', price: 20, category: 'mix-savory', image: '' },
    { id: 'ms3', name: 'ميكس شيدر', description: 'ميكس شيدر', price: 15, category: 'mix-savory', image: '' },
    { id: 'ms4', name: 'مشكل جبن', description: 'مشكل جبن', price: 15, category: 'mix-savory', image: '' },
    { id: 'ms5', name: 'فاهيتا لانشون', description: 'فاهيتا لانشون', price: 15, category: 'mix-savory', image: '' },
    { id: 'ms6', name: 'لانشون تركي', description: 'لانشون تركي', price: 20, category: 'mix-savory', image: '' },
    { id: 'ms7', name: 'تركي سوسيس', description: 'تركي سوسيس', price: 25, category: 'mix-savory', image: '' },
    { id: 'ms8', name: 'بسطرمة تركي', description: 'بسطرمة تركي', price: 25, category: 'mix-savory', image: '' },
    { id: 'ms9', name: 'تونة', description: 'تونة متميزة', price: 25, category: 'mix-savory', image: '' },
    { id: 'ms10', name: 'كريمة تركي', description: 'كريمة تركي', price: 20, category: 'mix-savory', image: '' },
    { id: 'ms11', name: 'ميكس حادق', description: 'ميكس حادق لغوصة', price: 30, category: 'mix-savory', image: '' },
    { id: 'ms12', name: 'بطاطس', description: 'بطاطس', price: 20, category: 'mix-savory', image: '' },
    { id: 'ms13', name: 'بطاطس موتزاريللا', description: 'بطاطس موتزاريللا', price: 30, category: 'mix-savory', image: '' },
    { id: 'ms14', name: 'جبنة مقلية', description: 'جبنة مقلية مقرمشة', price: 25, category: 'mix-savory', image: '' },
    { id: 'ms15', name: 'فاهيتا فراخ', description: 'فاهيتا فراخ', price: 30, category: 'mix-savory', image: '' },
    { id: 'ms16', name: 'لحمة بصل', description: 'لحمة بالبصل', price: 35, category: 'mix-savory', image: '' },
    { id: 'ms17', name: 'سجق خلطة', description: 'سجق خلطة لغوصة', price: 30, category: 'mix-savory', image: '' },
    { id: 'ms18', name: 'مكسيكي', description: 'مكسيكي حار', price: 25, category: 'mix-savory', image: '' },

    // Mix Sweet (mt1-mt16)
    { id: 'mt1', name: 'كريمة (عسل أو مربى)', description: 'كريمة بالعسل أو المربى', price: 15, category: 'mix-sweet', image: '' },
    { id: 'mt2', name: 'كريمة شوكولاتة', description: 'كريمة شوكولاتة', price: 15, category: 'mix-sweet', image: '' },
    { id: 'mt3', name: 'كريمة أوريو شوكولاتة', description: 'كريمة وأوريو وشوكولاتة', price: 25, category: 'mix-sweet', image: '' },
    { id: 'mt4', name: 'لوتس أو مورو', description: 'لوتس أو مورو', price: 20, category: 'mix-sweet', image: '' },
    { id: 'mt5', name: 'كريمة حلاوة شوكولاتة', description: 'كريمة وحلاوة وشوكولاتة', price: 25, category: 'mix-sweet', image: '' },
    { id: 'mt6', name: 'لوتس أوريو شوكولاتة', description: 'لوتس وأوريو وشوكولاتة', price: 25, category: 'mix-sweet', image: '' },
    { id: 'mt7', name: 'كيندر', description: 'كيندر', price: 25, category: 'mix-sweet', image: '' },
    { id: 'mt8', name: 'كيندر ميكس', description: 'كيندر ميكس لغوصة', price: 30, category: 'mix-sweet', image: '' },
    { id: 'mt9', name: 'بيستاشيو', description: 'بيستاشيو', price: 30, category: 'mix-sweet', image: '' },
    { id: 'mt10', name: 'بيستاشيو ميكس', description: 'بيستاشيو ميكس', price: 35, category: 'mix-sweet', image: '' },
    { id: 'mt11', name: 'مورو لوتس شوكولاتة', description: 'مورو ولوتس وشوكولاتة', price: 25, category: 'mix-sweet', image: '' },
    { id: 'mt12', name: 'مورو أوريو شوكولاتة', description: 'مورو وأوريو وشوكولاتة', price: 25, category: 'mix-sweet', image: '' },
    { id: 'mt13', name: 'F16', description: 'كريمة - مورو - أوريو - لوتس - سوداني - شوكولاتة', price: 35, category: 'mix-sweet', image: '' },
    { id: 'mt14', name: 'لغوصة بلس', description: 'كريمة - مورو - أوريو - كيندر - سوداني - شوكولاتة', price: 40, category: 'mix-sweet', image: '' },
    { id: 'mt15', name: 'لغوصة دابل بلس', description: 'كريمة - مورو - أوريو - كيندر - بيستاشيو - سوداني - ميكس شوكولاتة', price: 45, category: 'mix-sweet', image: '' },
    { id: 'mt16', name: 'إضافة سوداني', description: 'إضافة سوداني', price: 5, category: 'mix-sweet', image: '' },

    // Drinks (dr1-dr3)
    { id: 'dr1', name: 'Twist', description: 'تويست', price: 20, category: 'drinks', image: '' },
    { id: 'dr2', name: 'Water', description: 'مياه معدنية', price: 10, category: 'drinks', image: '' },
    { id: 'dr3', name: 'Big Cola', description: 'بيج كولا', price: 20, category: 'drinks', image: '' },

    // Extras (ex1-ex4)
    { id: 'ex1', name: 'Sauce', description: 'صوص', price: 10, category: 'extras', image: '' },
    { id: 'ex2', name: 'Cheese', description: 'جبنة سايحة', price: 20, category: 'extras', image: '' },
    { id: 'ex3', name: 'Beef Bacon', description: 'بيف بيكون', price: 30, category: 'extras', image: '' },
    { id: 'ex4', name: 'Turkey', description: 'تركي', price: 25, category: 'extras', image: '' },
];

export const INGREDIENTS = [
    // Bases
    { id: 'item_meat_patty', name: 'لحم بقري', price: 75, type: 'base', emoji: '🥩', description: 'لحم بقري صافي مشوي', categories: ['burger'] },
    { id: 'item_chicken_patty', name: 'فراخ كرسبي', price: 65, type: 'base', emoji: '🍗', description: 'صدور دجاج مقرمشة بخلطة لغوصة', categories: ['burger'] },
    { id: 'item_maria_base', name: 'قاعدة ماريا (تورتيلا + فلفل ألوان)', price: 50, type: 'base', emoji: '🌯', description: 'عيش تورتيلا، فلفل ألوان', categories: ['maria'] },
    { id: 'item_sand_base', name: 'عيش ساندوتش فرنساوي', price: 20, type: 'base', emoji: '🥪', description: 'خبز طازج للساندوتشات', categories: ['sandwiches'] },

    // Toppings - Bases (Free)
    { id: 'item_lettuce', name: 'خس', price: 0, type: 'topping', emoji: '🥬', categories: ['burger', 'sandwiches'] },
    { id: 'item_tomato', name: 'طماطم', price: 0, type: 'topping', emoji: '🍅', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_onion', name: 'بصل', price: 0, type: 'topping', emoji: '🧅', categories: ['burger', 'maria', 'sandwiches'] },

    // Toppings - Paid
    { id: 'item_spiced_fries', name: 'بطاطس متبلة', price: 20, type: 'topping', emoji: '🍟', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_cheese_slice', name: 'جبنة لغوصة', price: 3, type: 'topping', emoji: '🧀', categories: ['burger'] },
    { id: 'item_maria_keri', name: 'جبنة كيري', price: 10, type: 'topping', emoji: '🧀', categories: ['maria', 'sandwiches'] },
    { id: 'item_moz_melt', name: 'مودزاريلا سايحة', price: 20, type: 'topping', emoji: '🧀', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_caramel_onion', name: 'بصل مكرمل', price: 2, type: 'topping', emoji: '🧅', categories: ['burger', 'sandwiches'] },
    { id: 'item_onion_rings', name: 'حلقات بصل', price: 10, type: 'topping', emoji: '🧅', categories: ['burger', 'sandwiches'] },
    { id: 'item_moz_sticks', name: 'مودزاريلا ستيك', price: 10, type: 'topping', emoji: '🧀', categories: ['burger', 'sandwiches'] },
    { id: 'item_hotdog_slices', name: 'شرائح الهوت دوج', price: 10, type: 'topping', emoji: '🌭', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_maria_sausage', name: 'سجق لغوصة', price: 15, type: 'topping', emoji: '🌭', categories: ['maria', 'sandwiches'] },
    { id: 'item_maria_pepperoni', name: 'بيبيروني', price: 15, type: 'topping', emoji: '🍕', categories: ['maria'] },
    { id: 'item_maria_fajita', name: 'فاهيتا فراخ', price: 25, type: 'topping', emoji: '🥘', categories: ['maria', 'sandwiches'] },
    { id: 'item_maria_shawarma', name: 'شاورما لحم', price: 30, type: 'topping', emoji: '🥓', categories: ['maria', 'sandwiches'] },
    { id: 'item_grilled_chicken_item', name: 'فراخ جريل', price: 70, type: 'topping', emoji: '🍗', categories: ['sandwiches'] },
    { id: 'item_super_supreme_item', name: 'سوبر سوبريم', price: 70, type: 'topping', emoji: '🍖', categories: ['sandwiches'] },
    { id: 'item_mushroom_slices', name: 'شرائح المشروم', price: 20, type: 'topping', emoji: '🍄', categories: ['burger', 'sandwiches'] },
    { id: 'item_beef_bacon', name: 'بيف بيكون', price: 20, type: 'topping', emoji: '🥓', categories: ['burger', 'sandwiches'] },
    { id: 'item_jalapeno_slices', name: 'شرائح الهالوبينو', price: 5, type: 'topping', emoji: '🌶️', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_pastrami_slices', name: 'شرائح بسطرمة', price: 15, type: 'topping', emoji: '🥓', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_turkey_smoked', name: 'تركي مدخن', price: 20, type: 'topping', emoji: '🦃', categories: ['burger', 'sandwiches'] },

    // Sauces
    { id: 'item_1000_sauce', name: 'صوص 1000 جزيرة', price: 5, type: 'sauce', emoji: '🏝️', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_cheddar_sauce', name: 'صوص الشيدر كريمي', price: 10, type: 'sauce', emoji: '🧀', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_bbq_sauce', name: 'صوص باربيكيو', price: 5, type: 'sauce', emoji: '🍖', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_special_sauce', name: 'الصوص المميز', price: 10, type: 'sauce', emoji: '✨', categories: ['burger', 'sandwiches'] },
    { id: 'item_tasty_sauce', name: 'صوص التيستي', price: 10, type: 'sauce', emoji: '🤤', categories: ['burger', 'sandwiches'] },
    { id: 'item_buffalo_sauce', name: 'صوص البافلو', price: 5, type: 'sauce', emoji: '🔥', categories: ['burger', 'sandwiches'] },
    { id: 'item_ranch_sauce', name: 'صوص الرانش', price: 10, type: 'sauce', emoji: '🥛', categories: ['burger', 'maria', 'sandwiches'] },
    { id: 'item_mayo_sauce', name: 'مايونيز', price: 5, type: 'sauce', emoji: '⚪', categories: ['burger', 'sandwiches'] },
];
