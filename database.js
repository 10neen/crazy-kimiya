// ============================================================
// الموسوعة التفاعلية للجدول الدوري - قاعدة البيانات الكاملة
// برمجيات العدوي - كيمياء المرح
// الإصدار: 3.0.0 - أكثر من 250 تفاعل كيميائي
// ============================================================

// -----------------------------------------------------------
// بيانات العناصر الكيميائية الـ 118
// -----------------------------------------------------------
var ELEMENTS = [
  {
    Z:1, sym:"H", name:"Hydrogen", name_ar:"هيدروجين", mass:"1.008", type:"Nonmetal", type_ar:"لافلز", 
    state_ar:"غاز", melting_ar:"-259.16 °م", boiling_ar:"-252.87 °م", density_ar:"0.0899 غ/لتر", 
    color_ar:"عديم اللون", electron_config_ar:"1s¹", uses_ar:"وقود صواريخ، مكون للماء",
    valency: 1, activity: 5
  },
  {
    Z:2, sym:"He", name:"Helium", name_ar:"هيليوم", mass:"4.0026", type:"Noble Gas", type_ar:"غاز نبيل", 
    state_ar:"غاز", melting_ar:"-272.2 °م", boiling_ar:"-268.9 °م", density_ar:"0.1786 غ/لتر", 
    color_ar:"عديم اللون", electron_config_ar:"1s²", uses_ar:"بالونات، تبريد فائق",
    valency: 0, activity: 0
  },
  {
    Z:3, sym:"Li", name:"Lithium", name_ar:"ليثيوم", mass:"6.94", type:"Alkali Metal", type_ar:"فلز قلوي", 
    state_ar:"صلب", melting_ar:"180.5 °م", boiling_ar:"1342 °م", density_ar:"534 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[He] 2s¹", uses_ar:"بطاريات، سبائك خفيفة",
    valency: 1, activity: 9
  },
  {
    Z:4, sym:"Be", name:"Beryllium", name_ar:"بيريليوم", mass:"9.0122", type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", 
    state_ar:"صلب", melting_ar:"1287 °م", boiling_ar:"2471 °م", density_ar:"1850 كغ/م³", 
    color_ar:"رمادي", electron_config_ar:"[He] 2s²", uses_ar:"سبائك للطائرات والصواريخ",
    valency: 2, activity: 7
  },
  {
    Z:5, sym:"B", name:"Boron", name_ar:"بورون", mass:"10.81", type:"Metalloid", type_ar:"شبه فلز", 
    state_ar:"صلب", melting_ar:"2076 °م", boiling_ar:"3927 °م", density_ar:"2080 كغ/م³", 
    color_ar:"بني-أسود", electron_config_ar:"[He] 2s² 2p¹", uses_ar:"منظفات، زجاج البوروسيليكات",
    valency: 3, activity: 4
  },
  {
    Z:6, sym:"C", name:"Carbon", name_ar:"كربون", mass:"12.011", type:"Nonmetal", type_ar:"لافلز", 
    state_ar:"صلب", melting_ar:"3550 °م", boiling_ar:"4827 °م", density_ar:"2267 كغ/م³", 
    color_ar:"أسود (غرافيت)", electron_config_ar:"[He] 2s² 2p²", uses_ar:"وقود أحفوري، ألماس، غرافيت",
    valency: 4, activity: 3
  },
  {
    Z:7, sym:"N", name:"Nitrogen", name_ar:"نيتروجين", mass:"14.007", type:"Nonmetal", type_ar:"لافلز", 
    state_ar:"غاز", melting_ar:"-210 °م", boiling_ar:"-195.8 °م", density_ar:"1.251 غ/لتر", 
    color_ar:"عديم اللون", electron_config_ar:"[He] 2s² 2p³", uses_ar:"مكون رئيسي للهواء، صناعة الأسمدة",
    valency: 3, activity: 2
  },
  {
    Z:8, sym:"O", name:"Oxygen", name_ar:"أكسجين", mass:"15.999", type:"Nonmetal", type_ar:"لافلز", 
    state_ar:"غاز", melting_ar:"-218.8 °م", boiling_ar:"-183 °م", density_ar:"1.429 غ/لتر", 
    color_ar:"عديم اللون", electron_config_ar:"[He] 2s² 2p⁴", uses_ar:"التنفس، الاحتراق",
    valency: 2, activity: 8
  },
  {
    Z:9, sym:"F", name:"Fluorine", name_ar:"فلور", mass:"18.998", type:"Halogen", type_ar:"هالوجين", 
    state_ar:"غاز", melting_ar:"-219.62 °م", boiling_ar:"-188.12 °م", density_ar:"1.696 غ/لتر", 
    color_ar:"أصفر-بني فاتح", electron_config_ar:"[He] 2s² 2p⁵", uses_ar:"معجون الأسنان، التبريد",
    valency: 1, activity: 10
  },
  {
    Z:10, sym:"Ne", name:"Neon", name_ar:"نيون", mass:"20.180", type:"Noble Gas", type_ar:"غاز نبيل", 
    state_ar:"غاز", melting_ar:"-248.59 °م", boiling_ar:"-246.08 °م", density_ar:"0.8999 غ/لتر", 
    color_ar:"عديم اللون", electron_config_ar:"[He] 2s² 2p⁶", uses_ar:"إضاءة النيون، الليزر",
    valency: 0, activity: 0
  },
  {
    Z:11, sym:"Na", name:"Sodium", name_ar:"صوديوم", mass:"22.990", type:"Alkali Metal", type_ar:"فلز قلوي", 
    state_ar:"صلب", melting_ar:"97.72 °م", boiling_ar:"882.9 °م", density_ar:"968 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Ne] 3s¹", uses_ar:"ملح الطعام، تبريد المفاعلات",
    valency: 1, activity: 9.5
  },
  {
    Z:12, sym:"Mg", name:"Magnesium", name_ar:"ماغنسيوم", mass:"24.305", type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", 
    state_ar:"صلب", melting_ar:"650 °م", boiling_ar:"1091 °م", density_ar:"1738 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Ne] 3s²", uses_ar:"سبائك للطائرات، ألعاب نارية",
    valency: 2, activity: 8
  },
  {
    Z:13, sym:"Al", name:"Aluminium", name_ar:"ألومنيوم", mass:"26.982", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"660.32 °م", boiling_ar:"2519 °م", density_ar:"2700 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Ne] 3s² 3p¹", uses_ar:"أدوات المطبخ، هياكل الطائرات",
    valency: 3, activity: 7.5
  },
  {
    Z:14, sym:"Si", name:"Silicon", name_ar:"سيليكون", mass:"28.085", type:"Metalloid", type_ar:"شبه فلز", 
    state_ar:"صلب", melting_ar:"1414 °م", boiling_ar:"3265 °م", density_ar:"2329 كغ/م³", 
    color_ar:"رمادي غامق", electron_config_ar:"[Ne] 3s² 3p²", uses_ar:"إلكترونيات، زجاج، خزف",
    valency: 4, activity: 3
  },
  {
    Z:15, sym:"P", name:"Phosphorus", name_ar:"فسفور", mass:"30.974", type:"Nonmetal", type_ar:"لافلز", 
    state_ar:"صلب", melting_ar:"44.1 °م", boiling_ar:"280.5 °م", density_ar:"1823 كغ/م³", 
    color_ar:"أبيض، أحمر، أسود", electron_config_ar:"[Ne] 3s² 3p³", uses_ar:"أسمدة، أعواد ثقاب، منظفات",
    valency: 3, activity: 6
  },
  {
    Z:16, sym:"S", name:"Sulfur", name_ar:"كبريت", mass:"32.06", type:"Nonmetal", type_ar:"لافلز", 
    state_ar:"صلب", melting_ar:"115.21 °م", boiling_ar:"444.6 °م", density_ar:"2070 كغ/م³", 
    color_ar:"أصفر", electron_config_ar:"[Ne] 3s² 3p⁴", uses_ar:"حمض الكبريتيك، أسمدة، مبيدات حشرية",
    valency: 2, activity: 5
  },
  {
    Z:17, sym:"Cl", name:"Chlorine", name_ar:"كلور", mass:"35.45", type:"Halogen", type_ar:"هالوجين", 
    state_ar:"غاز", melting_ar:"-101.5 °م", boiling_ar:"-34.04 °م", density_ar:"3.214 غ/لتر", 
    color_ar:"أخضر مصفر", electron_config_ar:"[Ne] 3s² 3p⁵", uses_ar:"تنقية المياه، مبيضات",
    valency: 1, activity: 9
  },
  {
    Z:18, sym:"Ar", name:"Argon", name_ar:"أرغون", mass:"39.948", type:"Noble Gas", type_ar:"غاز نبيل", 
    state_ar:"غاز", melting_ar:"-189.3 °م", boiling_ar:"-185.8 °م", density_ar:"1.784 غ/لتر", 
    color_ar:"عديم اللون", electron_config_ar:"[Ne] 3s² 3p⁶", uses_ar:"إضاءة، لحام القوس الكهربائي",
    valency: 0, activity: 0
  },
  {
    Z:19, sym:"K", name:"Potassium", name_ar:"بوتاسيوم", mass:"39.098", type:"Alkali Metal", type_ar:"فلز قلوي", 
    state_ar:"صلب", melting_ar:"63.5 °م", boiling_ar:"759 °م", density_ar:"856 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Ar] 4s¹", uses_ar:"أسمدة، متفجرات، مكون غذائي",
    valency: 1, activity: 9.8
  },
  {
    Z:20, sym:"Ca", name:"Calcium", name_ar:"كالسيوم", mass:"40.078", type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", 
    state_ar:"صلب", melting_ar:"842 °م", boiling_ar:"1484 °م", density_ar:"1550 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Ar] 4s²", uses_ar:"بناء العظام، الأسمنت، الجبس",
    valency: 2, activity: 7.8
  },
  {
    Z:21, sym:"Sc", name:"Scandium", name_ar:"سكانديوم", mass:"44.956", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1541 °م", boiling_ar:"2836 °م", density_ar:"2985 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Ar] 3d¹ 4s²", uses_ar:"سبائك للطائرات، مصابيح التفريغ",
    valency: 3, activity: 6
  },
  {
    Z:22, sym:"Ti", name:"Titanium", name_ar:"تيتانيوم", mass:"47.867", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1668 °م", boiling_ar:"3287 °م", density_ar:"4506 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Ar] 3d² 4s²", uses_ar:"هياكل الطائرات، مفاصل صناعية",
    valency: 4, activity: 5
  },
  {
    Z:23, sym:"V", name:"Vanadium", name_ar:"فاناديوم", mass:"50.942", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1910 °م", boiling_ar:"3407 °م", density_ar:"6110 كغ/م³", 
    color_ar:"فضي-رمادي", electron_config_ar:"[Ar] 3d³ 4s²", uses_ar:"سبائك الفولاذ، أدوات الجراحة",
    valency: 5, activity: 4
  },
  {
    Z:24, sym:"Cr", name:"Chromium", name_ar:"كروم", mass:"51.996", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1907 °م", boiling_ar:"2671 °م", density_ar:"7150 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Ar] 3d⁵ 4s¹", uses_ar:"طلاء، فولاذ مقاوم للصدأ، صبغات",
    valency: 3, activity: 5
  },
  {
    Z:25, sym:"Mn", name:"Manganese", name_ar:"منجنيز", mass:"54.938", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1246 °م", boiling_ar:"2061 °م", density_ar:"7440 كغ/م³", 
    color_ar:"فضي-رمادي", electron_config_ar:"[Ar] 3d⁵ 4s²", uses_ar:"سبائك الصلب، بطاريات جافة",
    valency: 2, activity: 5
  },
  {
    Z:26, sym:"Fe", name:"Iron", name_ar:"حديد", mass:"55.845", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1538 °م", boiling_ar:"2862 °م", density_ar:"7874 كغ/م³", 
    color_ar:"فضي-رمادي لامع", electron_config_ar:"[Ar] 3d⁶ 4s²", uses_ar:"هياكل بناء، سيارات، أدوات",
    valency: 3, activity: 6
  },
  {
    Z:27, sym:"Co", name:"Cobalt", name_ar:"كوبالت", mass:"58.933", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1495 °م", boiling_ar:"2927 °م", density_ar:"8900 كغ/م³", 
    color_ar:"رمادي صلب", electron_config_ar:"[Ar] 3d⁷ 4s²", uses_ar:"بطاريات، سبائك فائقة، صبغات",
    valency: 2, activity: 4
  },
  {
    Z:28, sym:"Ni", name:"Nickel", name_ar:"نيكل", mass:"58.693", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1455 °م", boiling_ar:"2913 °م", density_ar:"8908 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Ar] 3d⁸ 4s²", uses_ar:"سبائك، عملات معدنية، بطاريات",
    valency: 2, activity: 4
  },
  {
    Z:29, sym:"Cu", name:"Copper", name_ar:"نحاس", mass:"63.546", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1084.6 °م", boiling_ar:"2560 °م", density_ar:"8960 كغ/م³", 
    color_ar:"أحمر-برتقالي", electron_config_ar:"[Ar] 3d¹⁰ 4s¹", uses_ar:"أسلاك كهربائية، عملات، أنابيب",
    valency: 2, activity: 3
  },
  {
    Z:30, sym:"Zn", name:"Zinc", name_ar:"زنك", mass:"65.38", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"419.5 °م", boiling_ar:"907 °م", density_ar:"7140 كغ/م³", 
    color_ar:"أزرق-أبيض لامع", electron_config_ar:"[Ar] 3d¹⁰ 4s²", uses_ar:"تغطية الحديد، بطاريات، سبائك",
    valency: 2, activity: 5
  },
  {
    Z:31, sym:"Ga", name:"Gallium", name_ar:"غاليوم", mass:"69.723", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"29.76 °م", boiling_ar:"2204 °م", density_ar:"5910 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p¹", uses_ar:"أجهزة إلكترونية، سبائك منخفضة الذوبان",
    valency: 3, activity: 4
  },
  {
    Z:32, sym:"Ge", name:"Germanium", name_ar:"جرمانيوم", mass:"72.630", type:"Metalloid", type_ar:"شبه فلز", 
    state_ar:"صلب", melting_ar:"938.2 °م", boiling_ar:"2833 °م", density_ar:"5323 كغ/م³", 
    color_ar:"رمادي-أبيض", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p²", uses_ar:"أشباه موصلات، ألياف بصرية، عدسات",
    valency: 4, activity: 3
  },
  {
    Z:33, sym:"As", name:"Arsenic", name_ar:"زرنيخ", mass:"74.922", type:"Metalloid", type_ar:"شبه فلز", 
    state_ar:"صلب", melting_ar:"817 °م", boiling_ar:"614 °م (تسامي)", density_ar:"5727 كغ/م³", 
    color_ar:"رمادي لامع", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p³", uses_ar:"مبيدات حشرية، سبائك، أشباه موصلات",
    valency: 3, activity: 4
  },
  {
    Z:34, sym:"Se", name:"Selenium", name_ar:"سيلينيوم", mass:"78.971", type:"Nonmetal", type_ar:"لافلز", 
    state_ar:"صلب", melting_ar:"221 °م", boiling_ar:"685 °م", density_ar:"4810 كغ/م³", 
    color_ar:"رمادي، أحمر، أسود", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p⁴", uses_ar:"زجاج أحمر، نسخ ضوئي، خلايا شمسية",
    valency: 2, activity: 4
  },
  {
    Z:35, sym:"Br", name:"Bromine", name_ar:"بروم", mass:"79.904", type:"Halogen", type_ar:"هالوجين", 
    state_ar:"سائل", melting_ar:"-7.2 °م", boiling_ar:"58.8 °م", density_ar:"3120 كغ/م³", 
    color_ar:"أحمر-بني", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p⁵", uses_ar:"مثبطات اللهب، مطهرات، مبيدات حشرية",
    valency: 1, activity: 8
  },
  {
    Z:36, sym:"Kr", name:"Krypton", name_ar:"كريبتون", mass:"83.798", type:"Noble Gas", type_ar:"غاز نبيل", 
    state_ar:"غاز", melting_ar:"-157.36 °م", boiling_ar:"-153.22 °م", density_ar:"3.749 غ/لتر", 
    color_ar:"عديم اللون", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p⁶", uses_ar:"مصابيح فلورسنت، ليزر",
    valency: 0, activity: 0
  },
  {
    Z:37, sym:"Rb", name:"Rubidium", name_ar:"روبيديوم", mass:"85.468", type:"Alkali Metal", type_ar:"فلز قلوي", 
    state_ar:"صلب", melting_ar:"39.31 °م", boiling_ar:"688 °م", density_ar:"1532 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 5s¹", uses_ar:"خلايا كهروضوئية، قنابل دخان",
    valency: 1, activity: 9.3
  },
  {
    Z:38, sym:"Sr", name:"Strontium", name_ar:"سترونشيوم", mass:"87.62", type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", 
    state_ar:"صلب", melting_ar:"777 °م", boiling_ar:"1382 °م", density_ar:"2640 كغ/م³", 
    color_ar:"فضي-أصفر", electron_config_ar:"[Kr] 5s²", uses_ar:"ألعاب نارية، إشارات استغاثة",
    valency: 2, activity: 7.5
  },
  {
    Z:39, sym:"Y", name:"Yttrium", name_ar:"إتريوم", mass:"88.906", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1522 °م", boiling_ar:"3338 °م", density_ar:"4472 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹ 5s²", uses_ar:"أجهزة ليزر، شاشات تلفزيون",
    valency: 3, activity: 5
  },
  {
    Z:40, sym:"Zr", name:"Zirconium", name_ar:"زركونيوم", mass:"91.224", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1855 °م", boiling_ar:"4409 °م", density_ar:"6520 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d² 5s²", uses_ar:"مفاعلات نووية، سبائك، سيراميك",
    valency: 4, activity: 4
  },
  {
    Z:41, sym:"Nb", name:"Niobium", name_ar:"نيوبيوم", mass:"92.906", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"2477 °م", boiling_ar:"4744 °م", density_ar:"8570 كغ/م³", 
    color_ar:"رمادي-فضي", electron_config_ar:"[Kr] 4d⁴ 5s¹", uses_ar:"سبائك فائقة، أنابيب غاز، مغناطيس فائق",
    valency: 5, activity: 3
  },
  {
    Z:42, sym:"Mo", name:"Molybdenum", name_ar:"موليبدينوم", mass:"95.95", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"2623 °م", boiling_ar:"4639 °م", density_ar:"10280 كغ/م³", 
    color_ar:"رمادي-فضي", electron_config_ar:"[Kr] 4d⁵ 5s¹", uses_ar:"سبائك فولاذ، أقطاب كهربائية، صبغات",
    valency: 6, activity: 3
  },
  {
    Z:43, sym:"Tc", name:"Technetium", name_ar:"تكنيتيوم", mass:"[98]", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"2157 °م", boiling_ar:"4265 °م", density_ar:"11500 كغ/م³", 
    color_ar:"رمادي-فضي", electron_config_ar:"[Kr] 4d⁵ 5s²", uses_ar:"مادة مشعة، تطبيقات طبية (التصوير)",
    valency: 7, activity: 2
  },
  {
    Z:44, sym:"Ru", name:"Ruthenium", name_ar:"روثينيوم", mass:"101.07", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"2334 °م", boiling_ar:"4150 °م", density_ar:"12450 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d⁷ 5s¹", uses_ar:"سبائك بلاتينية، محفزات كيميائية",
    valency: 3, activity: 2
  },
  {
    Z:45, sym:"Rh", name:"Rhodium", name_ar:"روديوم", mass:"102.91", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1964 °م", boiling_ar:"3695 °م", density_ar:"12410 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d⁸ 5s¹", uses_ar:"محفزات السيارات، مجوهرات",
    valency: 3, activity: 2
  },
  {
    Z:46, sym:"Pd", name:"Palladium", name_ar:"بالاديوم", mass:"106.42", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1554.9 °م", boiling_ar:"2963 °م", density_ar:"12020 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹⁰", uses_ar:"مجوهرات، طب الأسنان، محفزات",
    valency: 2, activity: 2
  },
  {
    Z:47, sym:"Ag", name:"Silver", name_ar:"فضة", mass:"107.868", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"961.78 °م", boiling_ar:"2162 °م", density_ar:"10490 كغ/م³", 
    color_ar:"فضي-أبيض لامع", electron_config_ar:"[Kr] 4d¹⁰ 5s¹", uses_ar:"مجوهرات، عملات، تصوير فوتوغرافي",
    valency: 1, activity: 2
  },
  {
    Z:48, sym:"Cd", name:"Cadmium", name_ar:"كادميوم", mass:"112.41", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"321.07 °م", boiling_ar:"767 °م", density_ar:"8650 كغ/م³", 
    color_ar:"أزرق-أبيض", electron_config_ar:"[Kr] 4d¹⁰ 5s²", uses_ar:"بطاريات، طلاء، صبغات",
    valency: 2, activity: 4
  },
  {
    Z:49, sym:"In", name:"Indium", name_ar:"إنديوم", mass:"114.818", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"156.6 °م", boiling_ar:"2072 °م", density_ar:"7310 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p¹", uses_ar:"شاشات، لحام، سبائك",
    valency: 3, activity: 3
  },
  {
    Z:50, sym:"Sn", name:"Tin", name_ar:"قصدير", mass:"118.71", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"231.93 °م", boiling_ar:"2602 °م", density_ar:"7310 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p²", uses_ar:"تغليف الأغذية، لحام، برونز",
    valency: 4, activity: 4
  },
  {
    Z:51, sym:"Sb", name:"Antimony", name_ar:"أنتيمون", mass:"121.760", type:"Metalloid", type_ar:"شبه فلز", 
    state_ar:"صلب", melting_ar:"630.63 °م", boiling_ar:"1587 °م", density_ar:"6697 كغ/م³", 
    color_ar:"فضي لامع", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p³", uses_ar:"سبائك، مثبطات اللهب، أشباه موصلات",
    valency: 3, activity: 3
  },
  {
    Z:52, sym:"Te", name:"Tellurium", name_ar:"تيلوريوم", mass:"127.60", type:"Metalloid", type_ar:"شبه فلز", 
    state_ar:"صلب", melting_ar:"449.5 °م", boiling_ar:"988 °م", density_ar:"6240 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p⁴", uses_ar:"سبائك، خلايا شمسية، صبغ السيراميك",
    valency: 2, activity: 2
  },
  {
    Z:53, sym:"I", name:"Iodine", name_ar:"يود", mass:"126.90", type:"Halogen", type_ar:"هالوجين", 
    state_ar:"صلب", melting_ar:"113.7 °م", boiling_ar:"184.3 °م", density_ar:"4930 كغ/م³", 
    color_ar:"أسود مزرق", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p⁵", uses_ar:"مطهر، علاج الغدة الدرقية، صبغات",
    valency: 1, activity: 7
  },
  {
    Z:54, sym:"Xe", name:"Xenon", name_ar:"زينون", mass:"131.293", type:"Noble Gas", type_ar:"غاز نبيل", 
    state_ar:"غاز", melting_ar:"-111.75 °م", boiling_ar:"-108.12 °م", density_ar:"5.894 غ/لتر", 
    color_ar:"عديم اللون", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p⁶", uses_ar:"إضاءة، تخدير، محركات الدفع الفضائية",
    valency: 0, activity: 0
  },
  {
    Z:55, sym:"Cs", name:"Cesium", name_ar:"سيزيوم", mass:"132.905", type:"Alkali Metal", type_ar:"فلز قلوي", 
    state_ar:"صلب", melting_ar:"28.44 °م", boiling_ar:"671 °م", density_ar:"1930 كغ/م³", 
    color_ar:"فضي-ذهبي", electron_config_ar:"[Xe] 6s¹", uses_ar:"ساعات ذرية، خلايا كهروضوئية",
    valency: 1, activity: 10
  },
  {
    Z:56, sym:"Ba", name:"Barium", name_ar:"باريوم", mass:"137.327", type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", 
    state_ar:"صلب", melting_ar:"727 °م", boiling_ar:"1897 °م", density_ar:"3510 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 6s²", uses_ar:"ألعاب نارية، سبائك، مواد إلكترونية",
    valency: 2, activity: 8
  },
  {
    Z:57, sym:"La", name:"Lanthanum", name_ar:"لانثانوم", mass:"138.905", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"920 °م", boiling_ar:"3464 °م", density_ar:"6162 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 5d¹ 6s²", uses_ar:"عدسات الكاميرا، مصابيح القوس الكربوني",
    valency: 3, activity: 5
  },
  {
    Z:58, sym:"Ce", name:"Cerium", name_ar:"سيريوم", mass:"140.116", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"795 °م", boiling_ar:"3443 °م", density_ar:"6770 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹ 5d¹ 6s²", uses_ar:"محفزات السيارات، مصابيح الغاز",
    valency: 3, activity: 5
  },
  {
    Z:59, sym:"Pr", name:"Praseodymium", name_ar:"براسيوديميوم", mass:"140.908", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"935 °م", boiling_ar:"3520 °م", density_ar:"6770 كغ/م³", 
    color_ar:"فضي-أصفر", electron_config_ar:"[Xe] 4f³ 6s²", uses_ar:"نظارات اللحام، مغناطيس دائم",
    valency: 3, activity: 5
  },
  {
    Z:60, sym:"Nd", name:"Neodymium", name_ar:"نيوديميوم", mass:"144.242", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1021 °م", boiling_ar:"3074 °م", density_ar:"7010 كغ/م³", 
    color_ar:"فضي-أصفر", electron_config_ar:"[Xe] 4f⁴ 6s²", uses_ar:"مغناطيس، أجهزة ليزر، زجاج ملون",
    valency: 3, activity: 5
  },
  {
    Z:61, sym:"Pm", name:"Promethium", name_ar:"بروميثيوم", mass:"[145]", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1042 °م", boiling_ar:"3000 °م", density_ar:"7260 كغ/م³", 
    color_ar:"فضي-أصفر", electron_config_ar:"[Xe] 4f⁵ 6s²", uses_ar:"مصادر طاقة محمولة، قياس السماكة",
    valency: 3, activity: 4
  },
  {
    Z:62, sym:"Sm", name:"Samarium", name_ar:"ساماريوم", mass:"150.36", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1072 °م", boiling_ar:"1794 °م", density_ar:"7520 كغ/م³", 
    color_ar:"فضي-رمادي", electron_config_ar:"[Xe] 4f⁶ 6s²", uses_ar:"مغناطيس دائم، محفزات",
    valency: 3, activity: 4
  },
  {
    Z:63, sym:"Eu", name:"Europium", name_ar:"يوروبيوم", mass:"151.964", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"822 °م", boiling_ar:"1529 °م", density_ar:"5244 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Xe] 4f⁷ 6s²", uses_ar:"أجهزة ليزر، شاشات تلفزيون ملونة",
    valency: 3, activity: 6
  },
  {
    Z:64, sym:"Gd", name:"Gadolinium", name_ar:"جادولينيوم", mass:"157.25", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1313 °م", boiling_ar:"3273 °م", density_ar:"7901 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f⁷ 5d¹ 6s²", uses_ar:"تصوير بالرنين المغناطيسي (MRI)، مفاعلات نووية",
    valency: 3, activity: 5
  },
  {
    Z:65, sym:"Tb", name:"Terbium", name_ar:"تيربيوم", mass:"158.925", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1356 °م", boiling_ar:"3230 °م", density_ar:"8219 كغ/م³", 
    color_ar:"فضي-رمادي", electron_config_ar:"[Xe] 4f⁹ 6s²", uses_ar:"شاشات فلورسنت، سبائك",
    valency: 3, activity: 5
  },
  {
    Z:66, sym:"Dy", name:"Dysprosium", name_ar:"ديسبروسيوم", mass:"162.500", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1412 °م", boiling_ar:"2567 °م", density_ar:"8550 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Xe] 4f¹⁰ 6s²", uses_ar:"مغناطيس دائم، مفاعلات نووية",
    valency: 3, activity: 5
  },
  {
    Z:67, sym:"Ho", name:"Holmium", name_ar:"هولميوم", mass:"164.930", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1474 °م", boiling_ar:"2700 °م", density_ar:"8795 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹¹ 6s²", uses_ar:"مغناطيس، ليزر",
    valency: 3, activity: 5
  },
  {
    Z:68, sym:"Er", name:"Erbium", name_ar:"إربيوم", mass:"167.259", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1529 °م", boiling_ar:"2868 °م", density_ar:"9066 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹² 6s²", uses_ar:"ألياف بصرية، أجهزة ليزر طبية",
    valency: 3, activity: 5
  },
  {
    Z:69, sym:"Tm", name:"Thulium", name_ar:"ثوليوم", mass:"168.934", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1545 °م", boiling_ar:"1950 °م", density_ar:"9320 كغ/م³", 
    color_ar:"فضي-رمادي", electron_config_ar:"[Xe] 4f¹³ 6s²", uses_ar:"مصادر أشعة سينية محمولة، ليزر",
    valency: 3, activity: 5
  },
  {
    Z:70, sym:"Yb", name:"Ytterbium", name_ar:"إتيربيوم", mass:"173.045", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"819 °م", boiling_ar:"1196 °م", density_ar:"6965 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 6s²", uses_ar:"مؤشر ضوئي، مفاعلات نووية",
    valency: 3, activity: 4
  },
  {
    Z:71, sym:"Lu", name:"Lutetium", name_ar:"لوتيتيوم", mass:"174.967", type:"Lanthanide", type_ar:"لانثانيد", 
    state_ar:"صلب", melting_ar:"1663 °م", boiling_ar:"3402 °م", density_ar:"9840 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d¹ 6s²", uses_ar:"محفزات، علاج الأورام",
    valency: 3, activity: 4
  },
  {
    Z:72, sym:"Hf", name:"Hafnium", name_ar:"هافنيوم", mass:"178.49", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"2233 °م", boiling_ar:"4603 °م", density_ar:"13310 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Xe] 4f¹⁴ 5d² 6s²", uses_ar:"قضبان تحكم في المفاعلات النووية، سبائك",
    valency: 4, activity: 3
  },
  {
    Z:73, sym:"Ta", name:"Tantalum", name_ar:"تانتالوم", mass:"180.948", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"3017 °م", boiling_ar:"5458 °م", density_ar:"16690 كغ/م³", 
    color_ar:"أزرق-رمادي", electron_config_ar:"[Xe] 4f¹⁴ 5d³ 6s²", uses_ar:"أدوات جراحية، محركات الطائرات النفاثة",
    valency: 5, activity: 2
  },
  {
    Z:74, sym:"W", name:"Tungsten", name_ar:"تنجستن", mass:"183.84", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"3422 °م", boiling_ar:"5930 °م", density_ar:"19300 كغ/م³", 
    color_ar:"رمادي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d⁴ 6s²", uses_ar:"خيوط المصابيح الكهربائية، سبائك الفولاذ",
    valency: 6, activity: 3
  },
  {
    Z:75, sym:"Re", name:"Rhenium", name_ar:"رينيوم", mass:"186.207", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"3186 °م", boiling_ar:"5596 °م", density_ar:"21020 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d⁵ 6s²", uses_ar:"محفزات الطائرات النفاثة، سبائك فائقة",
    valency: 7, activity: 2
  },
  {
    Z:76, sym:"Os", name:"Osmium", name_ar:"أوزميوم", mass:"190.23", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"3033 °م", boiling_ar:"5012 °م", density_ar:"22590 كغ/م³", 
    color_ar:"أزرق-رمادي", electron_config_ar:"[Xe] 4f¹⁴ 5d⁶ 6s²", uses_ar:"أقلام حبر، سبائك صلبة، أجهزة قياس",
    valency: 4, activity: 2
  },
  {
    Z:77, sym:"Ir", name:"Iridium", name_ar:"إيريديوم", mass:"192.217", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"2446 °م", boiling_ar:"4428 °م", density_ar:"22560 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d⁷ 6s²", uses_ar:"سبائك، أقلام حبر، مقاييس الوزن",
    valency: 4, activity: 2
  },
  {
    Z:78, sym:"Pt", name:"Platinum", name_ar:"بلاتين", mass:"195.084", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1768.3 °م", boiling_ar:"3825 °م", density_ar:"21450 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d⁹ 6s¹", uses_ar:"مجوهرات، محفزات السيارات، مختبرات",
    valency: 2, activity: 1
  },
  {
    Z:79, sym:"Au", name:"Gold", name_ar:"ذهب", mass:"196.967", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"1064.18 °م", boiling_ar:"2856 °م", density_ar:"19300 كغ/م³", 
    color_ar:"أصفر ذهبي", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s¹", uses_ar:"مجوهرات، إلكترونيات، احتياطي نقدي",
    valency: 3, activity: 1
  },
  {
    Z:80, sym:"Hg", name:"Mercury", name_ar:"زئبق", mass:"200.592", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"سائل", melting_ar:"-38.83 °م", boiling_ar:"356.73 °م", density_ar:"13534 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s²", uses_ar:"مقياس حرارة، بارومتر",
    valency: 2, activity: 2
  },
  {
    Z:81, sym:"Tl", name:"Thallium", name_ar:"ثاليوم", mass:"204.38", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"304 °م", boiling_ar:"1473 °م", density_ar:"11850 كغ/م³", 
    color_ar:"رمادي-أزرق", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", uses_ar:"خلايا كهروضوئية، أجهزة كشف الأشعة تحت الحمراء",
    valency: 1, activity: 4
  },
  {
    Z:82, sym:"Pb", name:"Lead", name_ar:"رصاص", mass:"207.2", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"327.46 °م", boiling_ar:"1749 °م", density_ar:"11340 كغ/م³", 
    color_ar:"أزرق-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", uses_ar:"بطاريات، حماية من الإشعاع، سبائك",
    valency: 2, activity: 3
  },
  {
    Z:83, sym:"Bi", name:"Bismuth", name_ar:"بزموت", mass:"208.980", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"271.4 °م", boiling_ar:"1564 °م", density_ar:"9780 كغ/م³", 
    color_ar:"وردي-فضي", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", uses_ar:"مستحضرات تجميل، أدوية، سبائك منخفضة الذوبان",
    valency: 3, activity: 3
  },
  {
    Z:84, sym:"Po", name:"Polonium", name_ar:"بولونيوم", mass:"[209]", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"254 °م", boiling_ar:"962 °م", density_ar:"9320 كغ/م³", 
    color_ar:"فضي-أسود", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", uses_ar:"مصادر حرارة نووية، مضاد للكهرباء الساكنة",
    valency: 2
  },
  {
    Z:85, sym:"At", name:"Astatine", name_ar:"أستاتين", mass:"[210]", type:"Halogen", type_ar:"هالوجين", 
    state_ar:"صلب", melting_ar:"302 °م", boiling_ar:"337 °م", density_ar:"غير معروفة", 
    color_ar:"أسود", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", uses_ar:"علاج السرطان (طب نووي)",
    valency: 1
  },
  {
    Z:86, sym:"Rn", name:"Radon", name_ar:"رادون", mass:"[222]", type:"Noble Gas", type_ar:"غاز نبيل", 
    state_ar:"غاز", melting_ar:"-71 °م", boiling_ar:"-61.7 °م", density_ar:"9.73 غ/لتر", 
    color_ar:"عديم اللون", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", uses_ar:"علاج السرطان، أبحاث الزلازل",
    valency: 0
  },
  {
    Z:87, sym:"Fr", name:"Francium", name_ar:"فرانسيوم", mass:"[223]", type:"Alkali Metal", type_ar:"فلز قلوي", 
    state_ar:"صلب", melting_ar:"27 °م", boiling_ar:"677 °م", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 7s¹", uses_ar:"أبحاث علمية نادرة",
    valency: 1, activity: 10
  },
  {
    Z:88, sym:"Ra", name:"Radium", name_ar:"راديوم", mass:"226", type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", 
    state_ar:"صلب", melting_ar:"700 °م", boiling_ar:"1737 °م", density_ar:"5500 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Rn] 7s²", uses_ar:"دهانات مضيئة (قديمًا)، علاج السرطان",
    valency: 2
  },
  {
    Z:89, sym:"Ac", name:"Actinium", name_ar:"أكتينيوم", mass:"227", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"1050 °م", boiling_ar:"3200 °م", density_ar:"10070 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Rn] 6d¹ 7s²", uses_ar:"مصادر نيوترونات، تطبيقات طبية",
    valency: 3
  },
  {
    Z:90, sym:"Th", name:"Thorium", name_ar:"ثوريوم", mass:"232.038", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"1750 °م", boiling_ar:"4788 °م", density_ar:"11724 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Rn] 6d² 7s²", uses_ar:"مفاعلات نووية، زجاج عالي الجودة",
    valency: 4
  },
  {
    Z:91, sym:"Pa", name:"Protactinium", name_ar:"بروتاكتينيوم", mass:"231.036", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"1568 °م", boiling_ar:"4027 °م", density_ar:"15370 كغ/م³", 
    color_ar:"فضي-رمادي", electron_config_ar:"[Rn] 5f² 6d¹ 7s²", uses_ar:"أبحاث علمية",
    valency: 5
  },
  {
    Z:92, sym:"U", name:"Uranium", name_ar:"يورانيوم", mass:"238.029", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"1132.3 °م", boiling_ar:"4131 °م", density_ar:"19050 كغ/م³", 
    color_ar:"فضي-رمادي", electron_config_ar:"[Rn] 5f³ 6d¹ 7s²", uses_ar:"وقود نووي، أسلحة نووية",
    valency: 6
  },
  {
    Z:93, sym:"Np", name:"Neptunium", name_ar:"نبتونيوم", mass:"237", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"639 °م", boiling_ar:"4174 °م", density_ar:"20450 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Rn] 5f⁴ 6d¹ 7s²", uses_ar:"مستشعرات نيوترونات",
    valency: 5
  },
  {
    Z:94, sym:"Pu", name:"Plutonium", name_ar:"بلوتونيوم", mass:"244", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"639.4 °م", boiling_ar:"3228 °م", density_ar:"19816 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Rn] 5f⁶ 7s²", uses_ar:"أسلحة نووية، وقود نووي",
    valency: 4
  },
  {
    Z:95, sym:"Am", name:"Americium", name_ar:"أميريسيوم", mass:"243", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"1176 °م", boiling_ar:"2607 °م", density_ar:"13670 كغ/م³", 
    color_ar:"فضي-أبيض", electron_config_ar:"[Rn] 5f⁷ 7s²", uses_ar:"كاشف دخان، مصادر إشعاع",
    valency: 3
  },
  {
    Z:96, sym:"Cm", name:"Curium", name_ar:"كوريوم", mass:"247", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"1340 °م", boiling_ar:"3100 °م", density_ar:"13510 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Rn] 5f⁷ 6d¹ 7s²", uses_ar:"طاقة للمركبات الفضائية",
    valency: 3
  },
  {
    Z:97, sym:"Bk", name:"Berkelium", name_ar:"بركليوم", mass:"247", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"986 °م", boiling_ar:"2627 °م", density_ar:"14780 كغ/م³", 
    color_ar:"فضي", electron_config_ar:"[Rn] 5f⁹ 7s²", uses_ar:"أبحاث علمية",
    valency: 3
  },
  {
    Z:98, sym:"Cf", name:"Californium", name_ar:"كاليفورنيوم", mass:"251", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"900 °م", boiling_ar:"1470 °م", density_ar:"15100 كغ/م³", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁰ 7s²", uses_ar:"مصادر نيوترونات",
    valency: 3
  },
  {
    Z:99, sym:"Es", name:"Einsteinium", name_ar:"أينشتاينيوم", mass:"252", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"860 °م", boiling_ar:"996 °م", density_ar:"8840 كغ/م³", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹¹ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 3
  },
  {
    Z:100, sym:"Fm", name:"Fermium", name_ar:"فيرميوم", mass:"257", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"1527 °م", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹² 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 3
  },
  {
    Z:101, sym:"Md", name:"Mendelevium", name_ar:"مندليفيوم", mass:"258", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"827 °م", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹³ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 3
  },
  {
    Z:102, sym:"No", name:"Nobelium", name_ar:"نوبليوم", mass:"259", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"827 °م", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 2
  },
  {
    Z:103, sym:"Lr", name:"Lawrencium", name_ar:"لورنسيوم", mass:"266", type:"Actinide", type_ar:"أكتينيد", 
    state_ar:"صلب", melting_ar:"1627 °م", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 3
  },
  {
    Z:104, sym:"Rf", name:"Rutherfordium", name_ar:"روذرفورديوم", mass:"267", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d² 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 4
  },
  {
    Z:105, sym:"Db", name:"Dubnium", name_ar:"دوبنيوم", mass:"268", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d³ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 5
  },
  {
    Z:106, sym:"Sg", name:"Seaborgium", name_ar:"سيبورجيوم", mass:"269", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁴ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 6
  },
  {
    Z:107, sym:"Bh", name:"Bohrium", name_ar:"بوريوم", mass:"270", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁵ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 7
  },
  {
    Z:108, sym:"Hs", name:"Hassium", name_ar:"هاسيوم", mass:"269", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁶ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 8
  },
  {
    Z:109, sym:"Mt", name:"Meitnerium", name_ar:"مايتنريوم", mass:"278", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁷ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 3
  },
  {
    Z:110, sym:"Ds", name:"Darmstadtium", name_ar:"دارمشتادتيوم", mass:"281", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁸ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 2
  },
  {
    Z:111, sym:"Rg", name:"Roentgenium", name_ar:"رونتجينيوم", mass:"282", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁹ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 3
  },
  {
    Z:112, sym:"Cn", name:"Copernicium", name_ar:"كوبرنيسيوم", mass:"285", type:"Transition Metal", type_ar:"فلز انتقالي", 
    state_ar:"غاز", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s²", uses_ar:"أبحاث علمية بحتة",
    valency: 2
  },
  {
    Z:113, sym:"Nh", name:"Nihonium", name_ar:"نيهونيوم", mass:"286", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"430 °م", boiling_ar:"1100 °م", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", uses_ar:"أبحاث علمية بحتة",
    valency: 3
  },
  {
    Z:114, sym:"Fl", name:"Flerovium", name_ar:"فليروفيوم", mass:"289", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", uses_ar:"أبحاث علمية بحتة",
    valency: 4
  },
  {
    Z:115, sym:"Mc", name:"Moscovium", name_ar:"موسكوفيوم", mass:"290", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"400 °م", boiling_ar:"1100 °م", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", uses_ar:"أبحاث علمية بحتة",
    valency: 3
  },
  {
    Z:116, sym:"Lv", name:"Livermorium", name_ar:"ليفرموريوم", mass:"293", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", 
    state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", uses_ar:"أبحاث علمية بحتة",
    valency: 2
  },
  {
    Z:117, sym:"Ts", name:"Tennessine", name_ar:"تينيسين", mass:"294", type:"Halogen", type_ar:"هالوجين", 
    state_ar:"صلب", melting_ar:"350 °م", boiling_ar:"550 °م", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", uses_ar:"أبحاث علمية بحتة",
    valency: 1
  },
  {
    Z:118, sym:"Og", name:"Oganesson", name_ar:"أوغانيسون", mass:"294", type:"Noble Gas", type_ar:"غاز نبيل", 
    state_ar:"غاز", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", 
    color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", uses_ar:"أبحاث علمية بحتة",
    valency: 0
  }
];

// -----------------------------------------------------------
// نظام المستويات التعليمية
// -----------------------------------------------------------
var LEVELS = {
  1: "ابتدائي",
  2: "إعدادي", 
  3: "ثانوي",
  4: "جامعي",
  5: "بحثي/متقدم"
};

// إضافة مستوى لكل عنصر
ELEMENTS.forEach(el => {
  if (el.Z <= 20) el.level = 1;
  else if (el.Z <= 38) el.level = 2;
  else if (el.Z <= 56) el.level = 2;
  else if (el.Z <= 71) el.level = 3;
  else if (el.Z <= 92) el.level = 3;
  else if (el.Z <= 103) el.level = 4;
  else el.level = 5;
});

// -----------------------------------------------------------
// تصحيح العناصر المشعة
// -----------------------------------------------------------
ELEMENTS.forEach(el => {
  if (el.Z >= 84) {
    el.radioactive = true;
    if (!el.activity) el.activity = 0;
  }
  if (!el.hasOwnProperty('radioactive')) {
    el.radioactive = false;
  }
});

// -----------------------------------------------------------
// خريطة البيانات للوصول السريع
// -----------------------------------------------------------
var MAP = {};
ELEMENTS.forEach(function(e) { MAP[e.sym] = e; });

// -----------------------------------------------------------
// دوال مساعدة للبحث
// -----------------------------------------------------------
function getElementByZ(Z) {
  return ELEMENTS.find(e => e.Z === Z) || null;
}

function getElementBySymbol(sym) {
  return MAP[sym] || null;
}

function getElementByNameAr(name) {
  return ELEMENTS.find(e => e.name_ar === name) || null;
}

function getElementsByLevel(level) {
  return ELEMENTS.filter(e => e.level === level);
}

// -----------------------------------------------------------
// الجدول الدوري الصحيح - 18 عمود
// -----------------------------------------------------------
var PERIOD_ROWS = [
  ["H",  "",   "",   "",   "",   "",   "",   "",   "",   "",   "",   "",   "",   "",   "",   "",   "",   "He"],
  ["Li", "Be", "",   "",   "",   "",   "",   "",   "",   "",   "",   "",   "B",  "C",  "N",  "O",  "F",  "Ne"],
  ["Na", "Mg", "",   "",   "",   "",   "",   "",   "",   "",   "",   "",   "Al", "Si", "P",  "S",  "Cl", "Ar"],
  ["K",  "Ca", "Sc", "Ti", "V",  "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"],
  ["Rb", "Sr", "Y",  "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I",  "Xe"],
  ["Cs", "Ba", "",   "Hf", "Ta", "W",  "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"],
  ["Fr", "Ra", "",   "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"]
];

// -----------------------------------------------------------
// السلسلة الأولى: اللانثانيدات (العناصر 57-71)
// -----------------------------------------------------------
var LANTHANIDES = [
  "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu"
];

// -----------------------------------------------------------
// السلسلة الثانية: الأكتينيدات (العناصر 89-103)
// -----------------------------------------------------------
var ACTINIDES = [
  "Ac", "Th", "Pa", "U",  "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"
];

// -----------------------------------------------------------
// دالة للحصول على جميع بيانات الجدول بشكل متكامل
// -----------------------------------------------------------
function getPeriodicTableData() {
  return {
    rows: PERIOD_ROWS,
    lanthanides: LANTHANIDES,
    actinides: ACTINIDES,
    elements: ELEMENTS
  };
}

// -----------------------------------------------------------
// دوال مساعدة للتفاعلات الكيميائية
// -----------------------------------------------------------
function findReaction(reactant1, reactant2) {
  const keys = [
    `${reactant1}+${reactant2}`,
    `${reactant2}+${reactant1}`
  ];
  
  for (let key of keys) {
    if (CHEMISTRY_DATABASE.specialReactions[key]) {
      return CHEMISTRY_DATABASE.specialReactions[key];
    }
    if (CHEMISTRY_DATABASE.elementReactions[key]) {
      return CHEMISTRY_DATABASE.elementReactions[key];
    }
    if (CHEMISTRY_DATABASE.organicReactions[key]) {
      return CHEMISTRY_DATABASE.organicReactions[key];
    }
    if (CHEMISTRY_DATABASE.ironReactions[key]) {
      return CHEMISTRY_DATABASE.ironReactions[key];
    }
    if (CHEMISTRY_DATABASE.doubleDisplacement[key]) {
      return CHEMISTRY_DATABASE.doubleDisplacement[key];
    }
    if (CHEMISTRY_DATABASE.heatLibrary[key]) {
      return CHEMISTRY_DATABASE.heatLibrary[key];
    }
    if (CHEMISTRY_DATABASE.redoxLibrary[key]) {
      return CHEMISTRY_DATABASE.redoxLibrary[key];
    }
  }
  return null;
}

function getReactionsByLevel(level) {
  let result = [];
  const sections = ['specialReactions', 'elementReactions', 'organicReactions', 'ironReactions', 'doubleDisplacement', 'redoxLibrary', 'heatLibrary'];
  
  sections.forEach(section => {
    if (CHEMISTRY_DATABASE[section]) {
      for (let key in CHEMISTRY_DATABASE[section]) {
        if (CHEMISTRY_DATABASE[section][key].level === level) {
          result.push({
            key: key,
            ...CHEMISTRY_DATABASE[section][key]
          });
        }
      }
    }
  });
  return result;
}

// ============================================================
// قاعدة البيانات الكيميائية الكبرى - النسخة الموسعة
// أكثر من 250 تفاعل كيميائي
// ============================================================
var CHEMISTRY_DATABASE = {
  
  // ---------------------------------------------------------
  // 1. قسم التفاعلات الأساسية والكواشف (زر تفاعل)
  // ---------------------------------------------------------
  specialReactions: {
    // ===== إضافات الصف الأول الإعدادي =====
    "Mg+O2": { full: "2Mg + O2", result: "2MgO", note: "احتراق الماغنسيوم: وميض أبيض مبهر 💥", level: 1 },
    "S+O2": { full: "S + O2", result: "SO2", note: "احتراق الكبريت: لهب أزرق ورائحة نفاذة", level: 1 },
    "Fe+S": { full: "Fe + S", result: "FeS", note: "اتحاد الحديد والكبريت: كبريتيد حديد أسود ⚫", level: 1 },
    "CuCO3": { full: "CuCO3 (تسخين)", result: "CuO + CO2↑", note: "انحلال كربونات النحاس: من أخضر لأسود", level: 1 },
    "2H2O": { full: "2H2O (كهرباء)", result: "2H2↑ + O2↑", note: "تحليل الماء: تصاعد غازين", level: 1 },

    // ===== إضافات الصف الثاني الإعدادي =====
    "Zn+HCl": { full: "Zn + 2HCl", result: "ZnCl2 + H2↑", note: "تفاعل فلز مع حمض: تصاعد هيدروجين", level: 1 },
    "Fe+CuSO4": { full: "Fe + CuSO4", result: "FeSO4 + Cu↓", note: "إزاحة: نحاس أحمر يترسب 🔴", level: 1 },
    "CuO+H2": { full: "CuO + H2", result: "Cu + H2O", note: "اختزال أكسيد النحاس: من أسود لأحمر", level: 1 },
    "NaOH+HCl": { full: "NaOH + HCl", result: "NaCl + H2O", note: "تعادل: حمض وقلوي ينتج ملح وماء", level: 1 },
    "NH3+HCl": { full: "NH3 + HCl", result: "NH4Cl", note: "⚪ دخان أبيض كثيف: كشف النشادر", level: 1 },

    // ===== إضافات الصف الثالث الإعدادي =====
    "2H2+O2": { full: "2H2 + O2", result: "2H2O", note: "انفجار الهيدروجين: أقوى تفاعل 💥", level: 1 },
    "4Fe+3O2": { full: "4Fe + 3O2", result: "2Fe2O3", note: "صدأ الحديد: أكسيد حديد أحمر 🟤", level: 1 },
    "2Na+2H2O": { full: "2Na + 2H2O", result: "2NaOH + H2↑", note: "صوديوم يشتعل على الماء 🔥", level: 1 },
    "CaO+H2O": { full: "CaO + H2O", result: "Ca(OH)2", note: "إطفاء الجير: حرارة شديدة 🔥", level: 1 },
    "Pb(NO3)2+KI": { full: "Pb(NO3)2 + 2KI", result: "PbI2↓ + 2KNO3", note: "🟡 راسب أصفر ذهبي: أجمل راسب", level: 1 },

    // ===== أولى ثانوي =====
    "2KClO3": { full: "2KClO3", result: "2KCl + 3O2↑", note: "تحضير الأكسجين معملياً (مع MnO2)", level: 2 },
    "2KMnO4": { full: "2KMnO4", result: "K2MnO4 + MnO2 + O2↑", note: "انحلال برمنجنات: لون بنفسجي يختفي", level: 2 },
    "2HgO": { full: "2HgO", result: "2Hg + O2↑", note: "انحلال أكسيد الزئبق: من أحمر لفضة", level: 2 },
    "2Ag2O": { full: "2Ag2O", result: "4Ag + O2↑", note: "انحلال أكسيد الفضة: فلز لامع", level: 2 },

    // ===== تانية ثانوي =====
    "2SO2+O2": { full: "2SO2 + O2", result: "2SO3", note: "اتصال ثاني أكسيد الكبريت (حفاز V2O5)", level: 3 },
    "SO3+H2O": { full: "SO3 + H2O", result: "H2SO4", note: "تكوين حمض الكبريتيك: تفاعل طارد للحرارة", level: 3 },
    "NH3+HNO3": { full: "NH3 + HNO3", result: "NH4NO3", note: "نترات أمونيوم: سماد نيتروجيني", level: 3 },
    "Cu+4HNO3": { full: "Cu + 4HNO3 (مركز)", result: "Cu(NO3)2 + 2NO2↑ + 2H2O", note: "غاز بني محمر سام 🟤", level: 3 },

    // ===== تالتة ثانوي - حديد =====
    "Fe2O3+3CO": { full: "Fe2O3 + 3CO", result: "2Fe + 3CO2", note: "اختزال الهيماتيت في الفرن العالي", level: 3 },
    "Fe2O3+3H2": { full: "Fe2O3 + 3H2", result: "2Fe + 3H2O", note: "اختزال الهيماتيت بالهيدروجين", level: 3 },
    "Fe3O4+4H2": { full: "Fe3O4 + 4H2", result: "3Fe + 4H2O", note: "اختزال أكسيد مغناطيسي", level: 3 },
    "FeO+CO": { full: "FeO + CO", result: "Fe + CO2", note: "اختزال أكسيد حديد II", level: 3 },
    "FeCl2+2NaOH": { full: "FeCl2 + 2NaOH", result: "Fe(OH)2↓ + 2NaCl", note: "🟢 راسب أخضر (هيدروكسيد حديد II)", level: 2 },
    "FeCl3+3NaOH": { full: "FeCl3 + 3NaOH", result: "Fe(OH)3↓ + 3NaCl", note: "🟤 راسب بني (هيدروكسيد حديد III)", level: 2 },
    "FeSO4+2NaOH": { full: "FeSO4 + 2NaOH", result: "Fe(OH)2↓ + Na2SO4", note: "🟢 راسب أخضر", level: 2 },
    "Fe2(SO4)3+6NaOH": { full: "Fe2(SO4)3 + 6NaOH", result: "2Fe(OH)3↓ + 3Na2SO4", note: "🟤 راسب بني", level: 2 },
    "3FeCl2+2K3[Fe(CN)6]": { full: "3FeCl2 + 2K3[Fe(CN)6]", result: "Fe3[Fe(CN)6]2↓", note: "🔵 أزرق تيرنبول (كشف Fe²⁺)", level: 3 },
    "4FeCl3+3K4[Fe(CN)6]": { full: "4FeCl3 + 3K4[Fe(CN)6]", result: "Fe4[Fe(CN)6]3↓", note: "🔵 أزرق بروسيا (كشف Fe³⁺)", level: 3 },
    "FeCl3+KSCN": { full: "FeCl3 + KSCN", result: "[Fe(SCN)]²⁺", note: "🔴 أحمر دموي (كشف Fe³⁺)", level: 3 },

    // ===== الهيدروكربونات =====
    "CH4+2O2": { full: "CH4 + 2O2", result: "CO2 + 2H2O", note: "احتراق الميثان: لهب أزرق", level: 2 },
    "C2H4+3O2": { full: "C2H4 + 3O2", result: "2CO2 + 2H2O", note: "احتراق الإيثيلين: لهب مضيء", level: 2 },
    "C2H2+2.5O2": { full: "C2H2 + 5/2 O2", result: "2CO2 + H2O", note: "احتراق الأسيتيلين: 3000°C", level: 3 },
    "CH4+Cl2": { full: "CH4 + Cl2 (ضوء)", result: "CH3Cl + HCl", note: "كلورة الميثان: تفاعل استبدال", level: 3 },
    "C2H4+Br2": { full: "C2H4 + Br2", result: "C2H4Br2", note: "🔴 يزول لون البروم (كشف عدم التشبع)", level: 3 },
    "C2H2+2Br2": { full: "C2H2 + 2Br2", result: "C2H2Br4", note: "🔴 إضافة بروم للأسيتيلين", level: 3 },
    "C2H4+H2": { full: "C2H4 + H2 (Ni)", result: "C2H6", note: "هدرجة الإيثيلين: تحويل لغير مشبع", level: 3 },
    "C2H2+H2O": { full: "C2H2 + H2O (Hg²⁺/H⁺)", result: "CH3CHO", note: "إماهة الأسيتيلين: أسيتالدهيد", level: 4 },

    // ===== الكحولات =====
    "C2H5OH+3O2": { full: "C2H5OH + 3O2", result: "2CO2 + 3H2O", note: "احتراق الإيثانول", level: 2 },
    "C2H5OH+[O]": { full: "C2H5OH + [O]", result: "CH3CHO + H2O", note: "أكسدة كحول أولي لألدهيد", level: 3 },
    "CH3CHO+[O]": { full: "CH3CHO + [O]", result: "CH3COOH", note: "أكسدة ألدهيد لحمض", level: 3 },
    "2C2H5OH+2Na": { full: "2C2H5OH + 2Na", result: "2C2H5ONa + H2↑", note: "إيثوكسيد صوديوم: تصاعد هيدروجين", level: 3 },
    "C2H5OH+H2SO4": { full: "C2H5OH + H2SO4 (170°C)", result: "C2H4 + H2O", note: "جفاف الإيثانول: إيثيلين", level: 3 },
    "2C2H5OH+H2SO4": { full: "2C2H5OH + H2SO4 (140°C)", result: "C2H5OC2H5 + H2O", note: "جفاف جزئي: إيثر", level: 3 },

    // ===== الأحماض والإسترات =====
    "CH3COOH+C2H5OH": { full: "CH3COOH + C2H5OH (H⁺)", result: "CH3COOC2H5 + H2O", note: "🍌 إستر: رائحة فواكه", level: 3 },
    "CH3COOH+NaOH": { full: "CH3COOH + NaOH", result: "CH3COONa + H2O", note: "تعادل حمض خليك", level: 2 },
    "CH3COOH+NaHCO3": { full: "CH3COOH + NaHCO3", result: "CH3COONa + CO2↑ + H2O", note: "🌋 بركان: فوران CO2", level: 1 },
    "HCOOH+[O]": { full: "HCOOH + [O]", result: "CO2↑ + H2O", note: "أكسدة حمض فورميك", level: 3 },
    "(COOH)2": { full: "(COOH)2 (حرارة)", result: "CO↑ + CO2↑ + H2O", note: "انحلال حمض أوكساليك", level: 4 },

    // ===== الفينولات والعطريات =====
    "C6H5OH+FeCl3": { full: "C6H5OH + FeCl3", result: "معقد بنفسجي", note: "🟣 كشف الفينول", level: 3 },
    "C6H5OH+NaOH": { full: "C6H5OH + NaOH", result: "C6H5ONa + H2O", note: "فينوكسيد صوديوم", level: 3 },
    "C6H6+Cl2": { full: "C6H6 + Cl2 (FeCl3)", result: "C6H5Cl + HCl", note: "كلورة البنزين", level: 4 },
    "C6H6+HNO3": { full: "C6H6 + HNO3 (H2SO4)", result: "C6H5NO2 + H2O", note: "نيترة البنزين: نيتروبنزين", level: 4 },
    "C6H5NO2+6[H]": { full: "C6H5NO2 + 6[H]", result: "C6H5NH2 + 2H2O", note: "اختزال نيتروبنزين لأنيلين", level: 4 }
  },

  // ---------------------------------------------------------
  // 2. قسم الانحلال الحراري (زر تسخين)
  // ---------------------------------------------------------
  heatLibrary: {
    "HgO": { full: "2HgO", result: "2Hg + O2 ↑", note: "🔴➔⚪ انحلال أكسيد الزئبق الأحمر لفضى وتصاعد O2.", level: 2 },
    "Cu(OH)2": { full: "Cu(OH)2", result: "CuO + H2O", note: "🔵➔⚫ انحلال هيدروكسيد النحاس الأزرق لأسود.", level: 1 },
    "CuCO3": { full: "CuCO3", result: "CuO + CO2 ↑", note: "🟢➔⚫ انحلال كربونات النحاس الخضراء لأسود.", level: 1 },
    "Pb(NO3)2": { full: "2Pb(NO3)2", result: "2PbO + 4NO2 + O2", note: "تصاعد غاز NO2 بني محمر وأكسجين.", level: 2 },
    "Fe(OH)3": { full: "2Fe(OH)3", result: "Fe2O3 + 3H2O", note: "عند > 200°C ينتج أكسيد حديد III أحمر.", level: 2 },
    "FeSO4": { full: "2FeSO4", result: "Fe2O3 + SO2 + SO3", note: "تسخين الكبريتات يعطي أكسيد حديد III وأكاسيد كبريت.", level: 3 },
    "FeC2O4": { full: "FeC2O4", result: "FeO + CO + CO2", note: "بمعزل عن الهواء ينتج أكسيد حديد II (أسود).", level: 4 },
    "CaCO3": { full: "CaCO3", result: "CaO + CO2 ↑", note: "تحويل الحجر الجيري إلى جير حي (صناعة الأسمنت).", level: 2 },
    "KMnO4": { full: "2KMnO4", result: "K2MnO4 + MnO2 + O2 ↑", note: "انحلال البرمنجنات لتحضير الأكسجين معملياً.", level: 2 },
    "NaHCO3": { full: "2NaHCO3", result: "Na2CO3 + H2O + CO2 ↑", note: "انحلال بيكربونات الصوديوم بالحرارة.", level: 1 },
    "NH4Cl": { full: "NH4Cl", result: "NH3↑ + HCl↑", note: "تسامي كلوريد الأمونيوم: يتبخر ثم يتكثف على الجوانب الباردة.", level: 2 },
    "KClO3": { full: "2KClO3", result: "2KCl + 3O2↑", note: "تحضير الأكسجين معملياً (باستخدام MnO2 كعامل مساعد).", level: 3 }
  },

  // ---------------------------------------------------------
  // 3. قسم الأكسدة والاختزال (زر أكسدة/اختزال)
  // ---------------------------------------------------------
  redoxLibrary: {
    "CuO+H2": { full: "CuO + H2", result: "Cu + H2O", note: "اختزال أكسيد النحاس الأسود إلى نحاس أحمر.", level: 2 },
    "Fe2O3+CO": { full: "Fe2O3 + 3CO", result: "2Fe + 3CO2", note: "اختزال الهيماتيت في الفرن العالي عند > 700°C.", level: 3 },
    "Fe2O3+H2": { full: "Fe2O3 + 3H2", result: "2Fe + 3H2O", note: "اختزال الهيماتيت بالهيدروجين لإنتاج الحديد.", level: 3 },
    "CO2+Mg": { full: "2Mg + CO2", result: "2MgO + C", note: "يستمر المغنيسيوم في الاحتراق ويترسب الكربون الأسود.", level: 2 },
    "C2H5OH+KMnO4": { full: "C2H5OH + [O]", result: "CH3COOH", note: "أكسدة الإيثانول لحمض خليك (يزول لون البرمنجنات البنفسجي).", level: 3 },
    "Fe+O2": { full: "3Fe + 2O2", result: "Fe3O4", note: "أكسدة الحديد المسخن للاحمرار ليعطي أكسيد مغناطيسي.", level: 2 },
    "FeO+O2": { full: "4FeO + O2", result: "2Fe2O3", note: "أكسدة أكسيد حديد II إلى أكسيد حديد III الأكثر استقراراً.", level: 3 },
    "Zn+CuSO4": { full: "Zn + CuSO4", result: "ZnSO4 + Cu↓", note: "الزنك يختزل النحاس II إلى نحاس فلزي.", level: 2 }
  },

  // ---------------------------------------------------------
  // 4. قسم اتحاد العناصر المباشر (عنصر + عنصر) - محدث
  // ---------------------------------------------------------
  elementReactions: {
    // ===== فلزات مع أكسجين =====
    "Mg+O2": { full: "2Mg + O2", result: "2MgO", note: "احتراق الماغنسيوم: وميض أبيض مبهر 💥", level: 1 },
    "2Mg+O2": { full: "2Mg + O2", result: "2MgO", note: "احتراق الماغنسيوم: وميض أبيض مبهر 💥", level: 1 },
    "Na+O2": { full: "4Na + O2", result: "2Na2O", note: "أكسدة الصوديوم: أكسيد صوديوم أبيض", level: 1 },
    "K+O2": { full: "4K + O2", result: "2K2O", note: "أكسدة البوتاسيوم: أكسيد بوتاسيوم", level: 1 },
    "Ca+O2": { full: "2Ca + O2", result: "2CaO", note: "أكسدة الكالسيوم: أكسيد كالسيوم (جير حي)", level: 1 },
    "Al+O2": { full: "4Al + 3O2", result: "2Al2O3", note: "أكسدة الألومنيوم: طبقة أكسيد واقية", level: 2 },
    "Fe+O2": { full: "3Fe + 2O2", result: "Fe3O4", note: "أكسدة الحديد: أكسيد مغناطيسي أسود ⚫", level: 2 },
    "Fe+O2": { full: "4Fe + 3O2", result: "2Fe2O3", note: "صدأ الحديد: أكسيد حديد أحمر 🟤", level: 1 },
    "Cu+O2": { full: "2Cu + O2", result: "2CuO", note: "أكسدة النحاس: طبقة سوداء", level: 2 },

    // ===== لا فلزات مع أكسجين =====
    "C+O2": { full: "C + O2 (وفير)", result: "CO2", note: "احتراق كامل: ثاني أكسيد الكربون", level: 1 },
    "C+O2": { full: "2C + O2 (محدود)", result: "2CO", note: "احتراق غير كامل: أول أكسيد الكربون السام ⚠️", level: 2 },
    "S+O2": { full: "S + O2", result: "SO2", note: "احتراق الكبريت: لهب أزرق ورائحة نفاذة", level: 1 },
    "H2+O2": { full: "2H2 + O2", result: "2H2O", note: "انفجار الهيدروجين: أقوى تفاعل 💥", level: 1 },
    "N2+O2": { full: "N2 + O2", result: "2NO", note: "اتحاد النيتروجين مع الأكسجين (حرارة عالية)", level: 3 },
    "P4+O2": { full: "P4 + 5O2", result: "P4O10", note: "احتراق الفوسفور: دخان أبيض كثيف", level: 2 },

    // ===== فلزات + هالوجينات =====
    "2Na+Cl2": { full: "2Na + Cl2", result: "2NaCl", note: "احتراق الصوديوم في الكلور: لهب أصفر ودخان أبيض", level: 2 },
    "2K+Cl2": { full: "2K + Cl2", result: "2KCl", note: "احتراق البوتاسيوم في الكلور", level: 2 },
    "Mg+Cl2": { full: "Mg + Cl2", result: "MgCl2", note: "اتحاد الماغنسيوم مع الكلور", level: 2 },
    "Ca+Cl2": { full: "Ca + Cl2", result: "CaCl2", note: "كلوريد الكالسيوم", level: 2 },
    "2Al+3Cl2": { full: "2Al + 3Cl2", result: "2AlCl3", note: "كلوريد الألومنيوم", level: 3 },
    "2Fe+3Cl2": { full: "2Fe + 3Cl2", result: "2FeCl3", note: "كلوريد حديد III (بني محمر)", level: 2 },
    "Fe+Cl2": { full: "2Fe + 3Cl2", result: "2FeCl3", note: "كلوريد حديد III", level: 2 },
    "Cu+Cl2": { full: "Cu + Cl2", result: "CuCl2", note: "كلوريد نحاس II (أصفر-بني)", level: 2 },

    // ===== فلزات + بروم =====
    "2Al+3Br2": { full: "2Al + 3Br2", result: "2AlBr3", note: "تفاعل الألومنيوم مع البروم: لهب وشرر 🔥", level: 3 },
    "Fe+Br2": { full: "2Fe + 3Br2", result: "2FeBr3", note: "بروميد حديد III", level: 3 },
    "Cu+Br2": { full: "Cu + Br2", result: "CuBr2", note: "بروميد نحاس II", level: 3 },

    // ===== فلزات + كبريت =====
    "Fe+S": { full: "Fe + S", result: "FeS", note: "اتحاد الحديد والكبريت: كبريتيد حديد أسود ⚫", level: 1 },
    "Zn+S": { full: "Zn + S", result: "ZnS", note: "تكوين كبريتيد الزنك الأبيض", level: 2 },
    "2Al+3S": { full: "2Al + 3S", result: "Al2S3", note: "كبريتيد الألومنيوم (يتحلل بالماء)", level: 3 },
    "Cu+S": { full: "2Cu + S", result: "Cu2S", note: "كبريتيد نحاس I", level: 2 },

    // ===== فلزات + نيتروجين =====
    "Mg+N2": { full: "3Mg + N2", result: "Mg3N2", note: "نتريد المغنيسيوم (يتحلل بالماء ليعطي نشادر)", level: 3 },
    "Ca+N2": { full: "3Ca + N2", result: "Ca3N2", note: "نتريد الكالسيوم", level: 3 },
    "Al+N2": { full: "2Al + N2", result: "2AlN", note: "نتريد الألومنيوم", level: 4 },

    // ===== هيدروجين مع لا فلزات =====
    "H2+Cl2": { full: "H2 + Cl2 (ضوء)", result: "2HCl", note: "انفجار في الضوء: غاز كلوريد الهيدروجين ☁️", level: 2 },
    "H2+Br2": { full: "H2 + Br2", result: "2HBr", note: "بروميد الهيدروجين", level: 3 },
    "H2+N2": { full: "N2 + 3H2", result: "2NH3", note: "تخليق الأمونيا (عملية هابر)", level: 4 },
    "H2+S": { full: "H2 + S", result: "H2S", note: "كبريتيد الهيدروجين: رائحة البيض العفن 🥚", level: 3 },

    // ===== هالوجينات مع هالوجينات =====
    "Cl2+2NaI": { full: "Cl2 + 2NaI", result: "2NaCl + I2", note: "الكلور يطرد اليود: محلول بني", level: 2 },
    "Br2+2KI": { full: "Br2 + 2KI", result: "2KBr + I2", note: "البروم يطرد اليود: محلول بني", level: 2 },
    "Cl2+2NaBr": { full: "Cl2 + 2NaBr", result: "2NaCl + Br2", note: "الكلور يطرد البروم", level: 2 },
    "Cl2+2KI": { full: "Cl2 + 2KI", result: "2KCl + I2", note: "🟣 يود متسامي", level: 2 },

    // ===== فلزات + ماء =====
    "2Na+2H2O": { full: "2Na + 2H2O", result: "2NaOH + H2↑", note: "صوديوم يشتعل على الماء 🔥", level: 1 },
    "2K+2H2O": { full: "2K + 2H2O", result: "2KOH + H2↑", note: "بوتاسيوم ينفجر على الماء 💥", level: 1 },
    "Ca+2H2O": { full: "Ca + 2H2O", result: "Ca(OH)2 + H2↑", note: "كالسيوم يتفاعل مع ماء", level: 1 },
    "Mg+2H2O": { full: "Mg + 2H2O (بخار)", result: "Mg(OH)2 + H2↑", note: "ماغنسيوم مع بخار ماء", level: 2 },

    // ===== تفاعلات عامة =====
    "Ca+H2": { full: "Ca + H2", result: "CaH2", note: "هيدريد الكالسيوم (مصدر هيدروجين)", level: 3 },
    "2C+O2": { full: "2C + O2", result: "2CO", note: "أول أكسيد الكربون", level: 2 },
    "P4+6Cl2": { full: "P4 + 6Cl2", result: "4PCl3", note: "كلورة الفوسفور: سائل يدخن", level: 3 },
    "P4+10Cl2": { full: "P4 + 10Cl2", result: "4PCl5", note: "كلورة كاملة: صلب أصفر", level: 3 }
  },

  // ---------------------------------------------------------
  // 5. قسم كيمياء الحديد المتقدمة
  // ---------------------------------------------------------
  ironReactions: {
    "Fe2++K3[Fe(CN)6]": { full: "3FeCl2 + 2K3[Fe(CN)6]", result: "Fe3[Fe(CN)6]2↓", note: "🔵 أزرق تيرنبول (كشف الحديد II).", level: 3 },
    "Fe3++K4[Fe(CN)6]": { full: "4FeCl3 + 3K4[Fe(CN)6]", result: "Fe4[Fe(CN)6]3↓", note: "🔵 أزرق بروسيا (كشف الحديد III).", level: 3 },
    "2FeCl3+SnCl2": { full: "2FeCl3 + SnCl2", result: "2FeCl2 + SnCl4", note: "اختزال حديد III إلى II باستخدام القصدير.", level: 4 },
    "2FeCl3+SO2": { full: "2FeCl3 + SO2 + 2H2O", result: "2FeCl2 + H2SO4 + 2HCl", note: "اختزال حديد III بغاز SO2.", level: 4 },
    "Fe(OH)2+O2": { full: "4Fe(OH)2 + O2 + 2H2O", result: "4Fe(OH)3↓", note: "🟢➔🟤 أكسدة هيدروكسيد الحديد II الأخضر لبني.", level: 2 },
    "Fe3O4+8HCl": { full: "Fe3O4 + 8HCl", result: "FeCl2 + 2FeCl3 + 4H2O", note: "تفاعل أكسيد الحديد المغناطيسي مع الحمض.", level: 3 },
    "Fe+2FeCl3": { full: "Fe + 2FeCl3", result: "3FeCl2", note: "اختزال أيونات الحديد III بفلز الحديد.", level: 3 }
  },

  // ---------------------------------------------------------
  // 6. قسم الكيمياء العضوية
  // ---------------------------------------------------------
  organicReactions: {
    "CH4+O2": { full: "CH4 + 2O2", result: "CO2 + 2H2O", note: "احتراق الميثان: ينتج طاقة هائلة وبخار ماء.", level: 2 },
    "C2H4+H2": { full: "C2H4 + H2", result: "C2H6", note: "هدرجة الإيثيلين: تحويل الزيوت النباتية غير المشبعة إلى سمن صناعي.", level: 3 },
    "C2H4+Br2": { full: "C2H4 + Br2", result: "C2H4Br2", note: "🔴 يزول لون البروم الأحمر (كشف عدم التشبع للرابطة المزدوجة).", level: 3 },
    "CH3COOH+C2H5OH": { full: "CH3COOH + C2H5OH", result: "CH3COOC2H5 + H2O", note: "🍓 تفاعل قسطرة: تكوين إستر إيثوات الإيثيل ذو رائحة ذكية.", level: 3 },
    "C2H2+O2": { full: "2C2H2 + 5O2", result: "4CO2 + 2H2O", note: "لهب الأوكسي أسيتيلين: تصل درجة حرارته لـ 3000°C ويستخدم في لحام المعادن.", level: 3 },
    "C6H5OH+FeCl3": { full: "C6H5OH + FeCl3", result: "Violet Color", note: "🟣 كشف الفينول: يتكون لون بنفسجي مميز عند إضافة كلوريد حديد III.", level: 3 },
    "C2H2+H2O": { full: "C2H2 + H2O", result: "CH3CHO", note: "هيدرة حفزية للأسيتيلين: ينتج الأسيتالدهيد الذي يمكن أكسدته لحمض خليك.", level: 4 },
    "C6H6+Cl2": { full: "C6H6 + 3Cl2", result: "C6H6Cl6", note: "تفاعل البنزين مع الكلور (UV): يتكون الجاماكسان (مبيد حشري).", level: 4 },
    "CH4+Cl2": { full: "CH4 + Cl2 (ضوء)", result: "CH3Cl + HCl", note: "هلجنة الميثان: كلوريد الميثيل.", level: 3 },
    "C2H6+Cl2": { full: "C2H6 + Cl2", result: "C2H5Cl + HCl", note: "كلوريد الإيثيل.", level: 3 },
    "C2H4+HCl": { full: "C2H4 + HCl", result: "C2H5Cl", note: "إضافة كلوريد الهيدروجين للإيثيلين.", level: 3 },
    "C2H4+H2O": { full: "C2H4 + H2O (H+)", result: "C2H5OH", note: "إماهة الإيثيلين: إنتاج الإيثانول.", level: 4 },
    "C2H2+2Br2": { full: "C2H2 + 2Br2", result: "C2H2Br4", note: "🔴 إضافة بروم للأسيتيلين: يزول اللون.", level: 3 },
    "C2H2+HCl": { full: "C2H2 + HCl", result: "CH2=CHCl", note: "كلوريد الفينيل (مونومر PVC).", level: 4 },
    "C2H5OH+Na": { full: "2C2H5OH + 2Na", result: "2C2H5ONa + H2↑", note: "إيثوكسيد الصوديوم وتصاعد هيدروجين.", level: 3 },
    "C2H5OH+H2SO4": { full: "C2H5OH (حرارة/حمض)", result: "C2H4 + H2O", note: "جفاف الإيثانول: إنتاج الإيثيلين.", level: 3 },
    "CH3CHO+[O]": { full: "CH3CHO + [O]", result: "CH3COOH", note: "أكسدة الأسيتالدهيد لحمض خليك.", level: 3 },
    "CH3CHO+Ag2O": { full: "CH3CHO + Ag2O", result: "CH3COOH + 2Ag↓", note: "👨‍🔬 مرآة الفضة (كشف الألدهيدات).", level: 3 },
    "nC2H4": { full: "n CH2=CH2", result: "(C2H4)n", note: "بلمرة الإيثيلين: إنتاج البولي إيثيلين.", level: 4 }
  },

  // ---------------------------------------------------------
  // 7. قسم الإحلال المزدوج المتقدم
  // ---------------------------------------------------------
  doubleDisplacement: {
    "(NH4)2SO4+Ca(OH)2": { full: "(NH4)2SO4 + Ca(OH)2", result: "CaSO4↓ + 2NH3↑ + 2H2O", note: "👃 تصاعد أمونيا (كشف أملاح الأمونيوم).", level: 2 },
    "NH4Cl+AgNO3": { full: "NH4Cl + AgNO3", result: "AgCl↓ + NH4NO3", note: "⚪ راسب أبيض (كشف أيون الكلوريد).", level: 2 },
    "Na2SO3+HCl": { full: "Na2SO3 + 2HCl", result: "2NaCl + H2O + SO2↑", note: "👃 تصاعد غاز SO2 النفاذ.", level: 2 },
    "Na2S+HCl": { full: "Na2S + 2HCl", result: "2NaCl + H2S↑", note: "🥚 رائحة البيض العفن (H2S).", level: 2 },
    "K2CrO4+Pb(NO3)2": { full: "K2CrO4 + Pb(NO3)2", result: "2KNO3 + PbCrO4↓", note: "🟡 راسب أصفر ليموني (كرومات الرصاص).", level: 3 },
    "K2Cr2O7+Pb(NO3)2": { full: "K2Cr2O7 + Pb(NO3)2", result: "2KNO3 + PbCr2O7↓", note: "🟠 راسب برتقالي.", level: 3 },
    "Na3PO4+AgNO3": { full: "Na3PO4 + 3AgNO3", result: "3NaNO3 + Ag3PO4↓", note: "🟡 راسب أصفر (فوسفات الفضة).", level: 2 },
    "Na2CO3+CaCl2": { full: "Na2CO3 + CaCl2", result: "CaCO3↓ + 2NaCl", note: "⚪ راسب أبيض (كربونات الكالسيوم).", level: 1 },
    "Na2SO4+BaCl2": { full: "Na2SO4 + BaCl2", result: "BaSO4↓ + 2NaCl", note: "⚪ راسب أبيض لا يذوب في الأحماض.", level: 2 }
  }
};

// -----------------------------------------------------------
// تصدير البيانات للاستخدام في الملفات الأخرى
// -----------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ELEMENTS,
    MAP,
    PERIOD_ROWS,
    LANTHANIDES,
    ACTINIDES,
    CHEMISTRY_DATABASE,
    LEVELS,
    getElementByZ,
    getElementBySymbol,
    getElementByNameAr,
    getElementsByLevel,
    getPeriodicTableData,
    findReaction,
    getReactionsByLevel
  };
}
