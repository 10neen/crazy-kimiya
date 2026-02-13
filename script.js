/* ============================================================
   1. مصنع الخلايا وبناء الجدول الدوري
   ============================================================ */

// تحديد كلاس العنصر بناءً على نوعه (للتنسيق اللوني)
function getGroupClass(type_ar) {
    if (!type_ar) return "transition";
    if (type_ar.includes("لانثانيد")) return "lanthanide"; 
    if (type_ar.includes("أكتينيد")) return "actinide";    
    if (type_ar.includes("غاز نبيل")) return "noble";      
    if (type_ar.includes("هالوجين")) return "halogen";
    if (type_ar.includes("فلز قلوي")) return "alkali";
    if (type_ar.includes("فلز قلوي أرضي")) return "alkaline";
    if (type_ar.includes("شبه فلز")) return "metalloid";
    if (type_ar.includes("لافلز")) return "nonmetal";
    if (type_ar.includes("فلز انتقالي")) return "transition";
    if (type_ar.includes("فلز بعد انتقالي")) return "post-transition";
    return "transition";
}

// إنشاء خلية العنصر (DOM Element)
function createElementCell(sym) {
    var div = document.createElement("div");
    if (!sym) {
        div.className = "element empty";
        div.style.visibility = "hidden";
        return div;
    }

    // إزالة الرقم من الرمز (مثل "1H" -> "H")
    var cleanSym = sym.replace(/[0-9]/g, '');
    
    // جلب البيانات من MAP الموجودة في database.js
    var data = (typeof MAP !== 'undefined') ? MAP[cleanSym] : null;
    if (!data) return div;

    var gClass = getGroupClass(data.type_ar);
    div.className = "element " + gClass;
    div.dataset.symbol = cleanSym;
    
    // تطبيق ألوان النيون البرمجية
    div.style.borderColor = "var(--color-" + gClass + ")";
    div.style.color = "var(--color-" + gClass + ")";

    div.innerHTML = 
        '<div class="element-content">' +
            '<div class="atomic-number">' + data.Z + '</div>' +
            '<div class="symbol-large">' + data.sym + '</div>' +
            '<div class="arabic-name">' + data.name_ar + '</div>' +
        '</div>';
    
    // ربط حدث الضغط لعرض التفاصيل
    div.onclick = function() { selectElement(data, div); };
    return div;
}

// بناء الهيكل الكامل (الجدول الرئيسي + السلاسل السفلية)
function buildCompleteSystem() {
    var main = document.getElementById("main-table");
    var lan = document.getElementById("lanth-table");
    var act = document.getElementById("act-table");

    if (main && typeof PERIOD_ROWS !== 'undefined') {
        main.innerHTML = "";
        main.style.display = "grid";
        main.style.gridTemplateColumns = "repeat(18, 1fr)";
        main.style.direction = "ltr"; 
        
        // تحويل المصفوفة متعددة الأبعاد لمصفوفة واحدة مسطحة
        var flatRows = [].concat.apply([], PERIOD_ROWS);
        flatRows.forEach(function(sym) { main.appendChild(createElementCell(sym)); });
    }

    // بناء سلاسل اللانتانيدات والأكتينيدات (الأسفل)
    if (lan && typeof LANTHANIDES !== 'undefined') {
        lan.innerHTML = "";
        for(var i=0; i<2; i++) lan.appendChild(createElementCell("")); // فراغ للمحاذاة
        LANTHANIDES.forEach(function(sym) { lan.appendChild(createElementCell(sym)); });
    }

    if (act && typeof ACTINIDES !== 'undefined') {
        act.innerHTML = "";
        for(var i=0; i<2; i++) act.appendChild(createElementCell(""));
        ACTINIDES.forEach(function(sym) { act.appendChild(createElementCell(sym)); });
    }

    // اختيار الهيدروجين تلقائياً كبداية
    setTimeout(function() {
        var hCell = document.querySelector('.element[data-symbol="H"]');
        if (hCell) hCell.click();
    }, 150);
}

// وظيفة تحديث بطاقة التفاصيل (Details Card)
function selectElement(data, el) {
    if (window.lastActive) window.lastActive.classList.remove("active");
    el.classList.add("active");
    window.lastActive = el;

    // تحديث ألوان البطاقة لتناسب لون مجموعة العنصر
    var neonColor = getComputedStyle(el).borderColor;
    var detailsCard = document.querySelector(".details-card");
    
    if (detailsCard) {
        detailsCard.style.borderColor = neonColor;
        detailsCard.style.boxShadow = "0 0 25px " + neonColor;
    }

    // خريطة البيانات المطلوب عرضها
    var fields = {
        'd-symbol': data.sym, 
        'd-number': data.Z, 
        'd-mass': data.mass,
        'd-name': data.name_ar, 
        'd-type': data.type_ar, 
        'd-state': data.state_ar,
        'd-mp': data.melting_ar, 
        'd-bp': data.boiling_ar, 
        'd-density': data.density_ar,
        'd-electrons': data.electron_config_ar, 
        'd-uses': data.uses_ar
    };

    // تعبئة البيانات في الـ HTML
    for (var id in fields) {
        var dom = document.getElementById(id);
        if (dom) dom.textContent = (fields[id] && fields[id] !== "undefined") ? fields[id] : "—";
    }
    
    // تحديث مستوى العنصر في الواجهة
    var levelBadge = document.getElementById('d-level');
    if (levelBadge && data.level) {
        var levelNames = {1: "ابتدائي", 2: "إعدادي", 3: "ثانوي", 4: "جامعي", 5: "بحثي"};
        levelBadge.textContent = levelNames[data.level] || "عام";
        levelBadge.className = "level-badge level-" + data.level;
    }
}

/* ============================================================
   1.5 تحديثات 2026 - البحث في الجدول والإدخال اليدوي
   ============================================================ */

// تعبئة قائمة الاقتراحات (datalist) للإدخال اليدوي
function populateDatalist() {
    const datalist = document.getElementById('elements-list');
    if (!datalist) return;
    
    datalist.innerHTML = '';
    
    // إضافة العناصر الكيميائية
    if (typeof ELEMENTS !== 'undefined') {
        ELEMENTS.forEach(el => {
            const option = document.createElement('option');
            option.value = el.sym;
            option.label = `${el.sym} - ${el.name_ar}`;
            datalist.appendChild(option);
        });
    }
    
    // إضافة المركبات الشائعة
    const commonCompounds = [
        'H2O', 'CO2', 'NH3', 'CH4', 'C2H4', 'C2H2', 'C2H5OH', 'CH3COOH',
        'HCl', 'H2SO4', 'HNO3', 'NaOH', 'KOH', 'NaCl', 'KCl',
        'AgNO3', 'BaCl2', 'KMnO4', 'K2Cr2O7', 'KI',
        'Na2CO3', 'NaHCO3', 'CaCO3', 'NH4Cl',
        'FeO', 'Fe2O3', 'Fe3O4', 'FeSO4', 'FeCl2', 'FeCl3',
        'CuO', 'CuSO4', 'Cu(OH)2', 'Pb(NO3)2'
    ];
    
    commonCompounds.forEach(comp => {
        const option = document.createElement('option');
        option.value = comp;
        option.label = comp;
        datalist.appendChild(option);
    });
    
    console.log(`✅ تم تعبئة ${datalist.children.length} خيار في قائمة الاقتراحات`);
}

// تفعيل البحث في الجدول الدوري (فلترة العناصر)
function setupElementSearch() {
    const searchInput = document.getElementById('element-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        const elements = document.querySelectorAll('.element:not(.empty)');
        
        if (query === '') {
            // إظهار كل العناصر
            elements.forEach(el => {
                el.style.opacity = '1';
                el.style.pointerEvents = 'auto';
                el.style.display = 'flex';
            });
            return;
        }
        
        // فلترة العناصر
        elements.forEach(el => {
            const symbol = el.dataset.symbol?.toLowerCase() || '';
            const nameEl = el.querySelector('.arabic-name');
            const name = nameEl?.textContent?.toLowerCase() || '';
            
            if (symbol.includes(query) || name.includes(query)) {
                el.style.opacity = '1';
                el.style.pointerEvents = 'auto';
                el.style.display = 'flex';
            } else {
                el.style.opacity = '0.2';
                el.style.pointerEvents = 'none';
            }
        });
    });
}

// ربط حقول الإدخال اليدوي بالتفاعلات
function setupManualInputs() {
    const slot1 = document.getElementById('slot-1');
    const slot2 = document.getElementById('slot-2');
    
    if (slot1) {
        slot1.addEventListener('change', function() {
            if (this.value.trim()) processReaction();
        });
        
        slot1.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') processReaction();
        });
    }
    
    if (slot2) {
        slot2.addEventListener('change', function() {
            if (this.value.trim()) processReaction();
        });
        
        slot2.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') processReaction();
        });
    }
}

/* ============================================================
   2. منطق المعمل الكيميائي ومحرك النتائج
   ============================================================ */

// قائمة الغازات التي توجد في صورة ثنائية الذرة
var GASES = ["H", "O", "N", "Cl", "Br", "F", "I"];

// تحويل الرمز لعنصر جزيئي (مثل H -> H2) عند البحث في قاعدة البيانات
function getMolecularFormula(sym) {
    if (!sym) return "";
    return GASES.indexOf(sym) !== -1 ? sym + "2" : sym;
}

// الدوال المستدعاة من الأزرار
function processReaction() { runLogic('react'); }
function processHeat() { runLogic('heat'); }
function processRedox() { runLogic('redox'); }

function runLogic(mode) {
    var s1 = document.getElementById('slot-1').value.trim();
    var s2 = document.getElementById('slot-2').value.trim();
    var report = document.getElementById('lab-report');

    if (!s1 && mode !== 'heat') {
        report.innerHTML = '<div style="background:#fff3f3; color:#c0392b; padding:20px; border-radius:12px; border:2px dashed #c0392b; text-align:right;">⚠️ يرجى اختيار مادة أولى على الأقل!</div>';
        return;
    }

    // 1. تحويل العناصر لصورها الجزيئية (مثل H إلى H2) قبل البحث
    var formula1 = getMolecularFormula(s1);
    var formula2 = getMolecularFormula(s2);

    // 2. بناء الاستعلام مع ترتيب أبجدي صارم
    var query = [formula1, formula2].filter(function(x) { return x !== ""; }).sort().join('+');

    var res = null;
    if (typeof CHEMISTRY_DATABASE !== 'undefined') {
        // البحث في كل أقسام قاعدة البيانات
        if (mode === 'react') {
            res = CHEMISTRY_DATABASE.specialReactions[query] || 
                  CHEMISTRY_DATABASE.elementReactions?.[query] ||
                  CHEMISTRY_DATABASE.organicReactions?.[query] ||
                  CHEMISTRY_DATABASE.ironReactions?.[query] ||
                  CHEMISTRY_DATABASE.doubleDisplacement?.[query];
        }
        if (mode === 'heat') {
            res = CHEMISTRY_DATABASE.heatLibrary[formula1] || 
                  CHEMISTRY_DATABASE.heatLibrary[formula2] ||
                  CHEMISTRY_DATABASE.specialReactions[query];
        }
        if (mode === 'redox') {
            res = CHEMISTRY_DATABASE.redoxLibrary[query];
        }
    }

    renderLabResult(res, mode, report, s1, s2);
}

/* --- وظيفة عرض نواتج المعمل --- */
function renderLabResult(res, type, container, s1, s2) {
    if (!container) return;
    
    if (res) {
        // تشغيل الصوت
        if (typeof playLabSound === 'function') {
            playLabSound(res.note);
        }

        // تأثير اهتزاز للتفاعلات القوية
        if (res.note.includes("فرقعة") || res.note.includes("انفجار") || res.note.includes("بعنف")) {
            const labWindow = document.querySelector('.molar-calculator') || container; 
            labWindow.style.animation = "shake 0.5s ease-in-out";
            setTimeout(() => { labWindow.style.animation = ""; }, 500);
        }

        var themeColor = (type === 'heat') ? "#e67e22" : (type === 'redox' ? "#9b59b6" : "#27ae60");
        
        var bgColor = "#ffffff"; 
        var textColor = "#333";

        // ألوان الخلفية حسب الملاحظة
        if (res.note.includes("بني محمر") || res.note.includes("بني")) bgColor = "#fdebd0"; 
        if (res.note.includes("أزرق")) bgColor = "#ebf5fb";
        if (res.note.includes("أخضر")) bgColor = "#e9f7ef";
        if (res.note.includes("أصفر")) bgColor = "#fef9e7";
        if (res.note.includes("أسود")) { bgColor = "#2c3e50"; textColor = "#fff"; }
        if (res.note.includes("بنفسجي") || res.note.includes("بنفسج")) bgColor = "#f4ecf7";

        // شارة المستوى
        var levelBadge = '';
        if (res.level) {
            var levelNames = {1: 'ابتدائي', 2: 'إعدادي', 3: 'ثانوي', 4: 'جامعي', 5: 'بحثي'};
            levelBadge = '<span style="background:' + themeColor + '20; color:' + themeColor + '; padding:3px 12px; border-radius:20px; font-size:0.8rem; margin-left:10px;">📚 ' + levelNames[res.level] + '</span>';
        }

        container.innerHTML = 
            '<div class="res-box ' + type + '" style="padding:25px; background:' + bgColor + '; color:' + textColor + '; border-radius:15px; text-align:right; border-right: 10px solid ' + themeColor + '; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transition: all 0.5s ease;">' +
                '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">' +
                    '<div class="badge" style="background:' + themeColor + '; color:white; padding:5px 15px; border-radius:20px; display:inline-block; font-weight:bold;">✨ نتيجة المختبر</div>' +
                    levelBadge +
                '</div>' +
                '<h2 style="font-size:2.2rem; margin:10px 0; font-family: Consolas, monospace; direction: ltr; text-align: center; letter-spacing: 1px;">' + res.full + ' → ' + res.result + '</h2>' +
                '<div style="height:2px; background:rgba(0,0,0,0.05); margin:15px 0;"></div>' +
                '<p style="font-size:1.2rem; line-height:1.6;"><strong>📝 الملاحظة:</strong> ' + res.note + '</p>' +
                '<div style="margin-top:20px; display:flex; gap:10px; justify-content:flex-end;">' +
                    '<button onclick="shareResult(\'' + encodeURIComponent(JSON.stringify(res)) + '\')" style="background:' + themeColor + '; color:white; border:none; padding:10px 20px; border-radius:30px; cursor:pointer; font-weight:bold;">📱 مشاركة</button>' +
                '</div>' +
            '</div>';
            
        container.style.animation = "none";
        setTimeout(function() { container.style.animation = "fadeInUp 0.4s ease forwards"; }, 10);

    } else {
        // تفاعل غير موجود
        if (typeof playLabSound === 'function') playLabSound("خطأ");
        
        var suggestion = '';
        if (s1 && s2) {
            suggestion = '<div style="margin-top:15px; padding:15px; background:#f8f9fa; border-radius:10px; text-align:right;">💡 جرب: <strong>' + s1 + '</strong> مع <strong>O2</strong> أو <strong>HCl</strong> أو <strong>H2O</strong></div>';
        }
        
        container.innerHTML = '<div style="background:#fff3f3; color:#c0392b; padding:20px; border-radius:12px; border:2px dashed #c0392b; text-align:right;">⚠️ هذا التفاعل غير مسجل في قاعدة البيانات.' + suggestion + '</div>';
    }
}

/* --- محرك الكتلة المولية مع التصحيح الذكي --- */
function showMolarResult() {
    let input = document.getElementById('formula-input').value.trim();
    const resultDiv = document.getElementById('molar-result');
    if (!resultDiv) return;
    
    if (!input) {
        resultDiv.innerHTML = "⚠️ يرجى كتابة صيغة صحيحة.";
        return;
    }

    // تصحيح الحروف تلقائياً
    let corrected = input.replace(/([a-z])([a-z]*)/gi, function(match) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });

    // تنظيف الصيغة
    corrected = corrected.replace(/\s+/g, '');

    // حساب الكتلة
    const mass = (typeof calculateMolarMass === 'function') ? calculateMolarMass(corrected) : 0;
    
    if (mass > 0) {
        resultDiv.innerHTML = 
            '<div style="background: rgba(0, 212, 255, 0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(0, 212, 255, 0.3); color: #fff;">' +
                '<div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">' +
                    '<span style="background:#00d4ff; color:#000; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">🧪</span>' +
                    '<div style="flex:1;">' +
                        '<span style="color:#888;">الكتلة المولية لـ </span>' +
                        '<strong style="color:#00d4ff; font-size:1.3rem; direction:ltr; display:inline-block;">' + corrected + '</strong>' +
                    '</div>' +
                    '<span style="font-size: 1.8rem; color: #00d4ff; font-weight: bold; text-shadow: 0 0 10px rgba(0,212,255,0.5); direction:ltr;">' + mass + '</span>' +
                    '<span style="color:#888;">جم/مول</span>' +
                '</div>' +
                '<div style="margin-top:10px; font-size:0.85rem; color:#aaa; border-top:1px dashed #444; padding-top:8px;">' +
                    '✅ تم الحساب باستخدام أحدث الكتل الذرية' +
                '</div>' +
            '</div>';
    } else {
        resultDiv.innerHTML = '<span style="color: #ff4444;">⚠️ صيغة غير مكتملة أو رمز غير معروف. مثال: H2SO4, CH3COOH, NH3</span>';
    }
}

/* ============================================================
   3. المنطق الرياضي ونظام التشغيل النهائي
   ============================================================ */

/**
 * المحرك الرياضي: يحسب الكتلة المولية مع دعم التصحيح التلقائي
 */
function calculateMolarMass(formula) {
    if (!formula) return 0;

    // 1. معالجة الأقواس: (OH)2 → O2H2, (NH4)2SO4 → N2H8SO4
    let processed = formula;
    
    while (processed.includes('(')) {
        processed = processed.replace(/\(([^()]+)\)(\d*)/g, (match, content, multiplier) => {
            const num = parseInt(multiplier) || 1;
            return content.replace(/([A-Z][a-z]*)(\d*)/g, (m, sym, count) => {
                let cnt = (parseInt(count) || 1) * num;
                return sym + (cnt > 1 ? cnt : '');
            });
        });
    }

    // 2. تصحيح الحروف: H2o → H2O
    processed = processed.replace(/([A-Z][a-z]*)([a-z])/g, (m, sym, lower) => {
        return sym + lower.toUpperCase();
    });
    
    // 3. التعامل مع المركبات العضوية المكتوبة بطريقة خاطئة
    if (processed.includes('CH3COOH')) processed = processed.replace('CH3COOH', 'C2H4O2');
    if (processed.includes('CH3COO')) processed = processed.replace('CH3COO', 'C2H3O2');
    if (processed.includes('CH3')) processed = processed.replace('CH3', 'C1H3');
    if (processed.includes('CH2')) processed = processed.replace('CH2', 'C1H2');
    if (processed.includes('CH')) processed = processed.replace('CH', 'C1H1');
    if (processed.includes('OH')) processed = processed.replace('OH', 'O1H1');
    if (processed.includes('NH2')) processed = processed.replace('NH2', 'N1H2');
    if (processed.includes('NH4')) processed = processed.replace('NH4', 'N1H4');
    if (processed.includes('SO4')) processed = processed.replace('SO4', 'S1O4');
    if (processed.includes('NO3')) processed = processed.replace('NO3', 'N1O3');
    if (processed.includes('PO4')) processed = processed.replace('PO4', 'P1O4');
    if (processed.includes('CO3')) processed = processed.replace('CO3', 'C1O3');

    // 4. حساب الكتلة
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let totalMass = 0, found = false;
    let match;

    while ((match = regex.exec(processed)) !== null) {
        let symbol = match[1];
        let count = parseInt(match[2]) || 1;
        
        if (typeof MAP !== 'undefined' && MAP[symbol]) {
            totalMass += parseFloat(MAP[symbol].mass) * count;
            found = true;
        }
    }
    return found ? totalMass.toFixed(3) : 0;
}

/**
 * دالة مسح قاعدة البيانات: تستخرج كل المركبات الفريدة
 */
function getUniqueCompounds() {
    var allFound = {};
    if (typeof CHEMISTRY_DATABASE !== 'undefined') {
        var sections = [
            CHEMISTRY_DATABASE.specialReactions,
            CHEMISTRY_DATABASE.heatLibrary,
            CHEMISTRY_DATABASE.redoxLibrary,
            CHEMISTRY_DATABASE.elementReactions,
            CHEMISTRY_DATABASE.organicReactions,
            CHEMISTRY_DATABASE.ironReactions,
            CHEMISTRY_DATABASE.doubleDisplacement
        ];

        sections.forEach(function(lib) {
            if (lib) {
                Object.keys(lib).forEach(function(fullKey) {
                    fullKey.split('+').forEach(function(item) {
                        var trimmed = item.trim();
                        if (trimmed && !trimmed.includes(' ')) allFound[trimmed] = true;
                    });
                });
            }
        });
    }
    return Object.keys(allFound).sort();
}

/**
 * تصفير المعمل
 */
function clearLab() {
    var s1 = document.getElementById('slot-1');
    var s2 = document.getElementById('slot-2');
    var report = document.getElementById('lab-report');
    var molarInput = document.getElementById('formula-input');
    var molarResult = document.getElementById('molar-result');
    
    if (s1) s1.value = '';
    if (s2) s2.value = '';
    if (report) report.innerHTML = '<div style="color:#888; border:2px dashed #444; padding:20px; border-radius:10px; text-align:center;">🧪 المعمل جاهز.. اختر المواد وابدأ التفاعل</div>';
    if (molarInput) molarInput.value = '';
    if (molarResult) molarResult.innerHTML = '';
    
    window.activeSlotId = 'slot-1';
}

/* ============================================================
   4. محرك الرف الذكي
   ============================================================ */

var QUICK_COMPOUNDS = [
    "H2O", "CO2", "NH3", "CH4", "C2H4", "C2H2", "C2H5OH", "CH3COOH", 
    "Fe2O3", "Fe3O4", "FeO", "FeSO4", "FeCl3", "Fe(OH)3", "FeC2O4", 
    "CuO", "CuSO4", "NaOH", "HCl", "H2SO4", "HNO3", "AgNO3", "BaCl2", 
    "Na2CO3", "NaHCO3", "KI", "KMnO4", "Pb(NO3)2", "CaCO3", "NH4Cl"
];

var activeSlotId = 'slot-1';

function initializeQuickShelf() {
    var shelf = document.getElementById("quick-shelf");
    if (!shelf) return;

    var allItems = new Set();
    QUICK_COMPOUNDS.forEach(c => allItems.add(c));

    if (typeof CHEMISTRY_DATABASE !== 'undefined') {
        var libs = [
            CHEMISTRY_DATABASE.specialReactions, 
            CHEMISTRY_DATABASE.heatLibrary, 
            CHEMISTRY_DATABASE.redoxLibrary,
            CHEMISTRY_DATABASE.elementReactions,
            CHEMISTRY_DATABASE.organicReactions,
            CHEMISTRY_DATABASE.ironReactions,
            CHEMISTRY_DATABASE.doubleDisplacement
        ];
        libs.forEach(lib => {
            if (lib) {
                Object.keys(lib).forEach(key => {
                    key.split('+').forEach(item => { 
                        if (item && item.trim()) allItems.add(item.trim()); 
                    });
                });
            }
        });
    }

    shelf.innerHTML = "";
    
    Array.from(allItems).sort().forEach(function(comp) {
        var btn = document.createElement("button");
        btn.textContent = comp;
        btn.dataset.compound = comp;
        
        btn.style.cssText = "padding:8px 14px; margin:5px; cursor:pointer; background:#1a1a1a; color:#00d4ff; border:1px solid #00d4ff; border-radius:6px; font-weight:bold; transition: 0.3s; font-family: 'Segoe UI', sans-serif;";
        
        btn.onmouseover = function() { 
            this.style.background = "#00d4ff"; 
            this.style.color = "#000"; 
            this.style.boxShadow = "0 0 10px #00d4ff"; 
        };
        btn.onmouseout = function() { 
            this.style.background = "#1a1a1a"; 
            this.style.color = "#00d4ff"; 
            this.style.boxShadow = "none"; 
        };

        btn.onclick = function(e) {
            e.preventDefault();
            fillInput(this.dataset.compound);
        };
        shelf.appendChild(btn);
    });
}

function fillInput(val) {
    const molarInput = document.getElementById('formula-input');
    if (molarInput) {
        molarInput.value = val;
        if (typeof showMolarResult === 'function') showMolarResult();
    }

    if (typeof activeSlotId === 'undefined') window.activeSlotId = 'slot-1';
    const targetSlot = document.getElementById(activeSlotId);
    
    if (targetSlot) {
        targetSlot.value = val;
        if (typeof processReaction === 'function') processReaction();
        window.activeSlotId = (window.activeSlotId === 'slot-1') ? 'slot-2' : 'slot-1';
        updateActiveSlotHighlight();
    }
}

function updateActiveSlotHighlight() {
    var slot1 = document.getElementById('slot-1');
    var slot2 = document.getElementById('slot-2');
    if (slot1) slot1.style.borderColor = window.activeSlotId === 'slot-1' ? '#00d4ff' : '#333';
    if (slot2) slot2.style.borderColor = window.activeSlotId === 'slot-2' ? '#00d4ff' : '#333';
}

/**
 * وظيفة السحب (ملغاة حالياً - البطاقة ثابتة)
 */
function makeDraggable(el) {
    // معطل: البطاقة ثابتة
    return;
}

/* ============================================================
   5. محرك البحث الذكي والصوت والمشاركة
   ============================================================ */

function filterShelfOnly(searchInput) {
    let query = searchInput.value.toLowerCase().trim();
    let buttons = document.querySelectorAll('#quick-shelf button');
    const resultDiv = document.getElementById('molar-result');
    const molarInput = document.getElementById('formula-input');

    if (query === "") {
        buttons.forEach(btn => btn.style.display = "inline-block");
        if (resultDiv) resultDiv.innerHTML = "";
        return;
    }

    buttons.forEach(btn => {
        let btnText = btn.innerText.toLowerCase();
        btn.style.display = btnText.includes(query) ? "inline-block" : "none";
    });

    if (typeof calculateMolarMass === 'function') {
        const mass = calculateMolarMass(query);
        if (mass > 0) {
            if (molarInput) molarInput.value = query.toUpperCase(); 
            showMolarResult();
        } else {
            if (resultDiv) resultDiv.innerHTML = "";
        }
    }
}

function playLabSound(note) {
    let audio = new Audio();
    
    if (note.includes("غاز") || note.includes("فوران") || note.includes("CO2")) {
        audio.src = "sounds/bubble.mp3";
    } else if (note.includes("فرقعة") || note.includes("انفجار") || note.includes("بعنف")) {
        audio.src = "sounds/pop.mp3";
    } else if (note.includes("خطأ")) {
        audio.src = "sounds/error.mp3";
    } else {
        audio.src = "sounds/success.mp3";
    }
    
    audio.volume = 0.3;
    
    audio.play().catch(e => {
        console.log("🔇 الصوت مقيد حتى يتفاعل المستخدم مع الصفحة");
    });
}

function shareResult(resJSON) {
    try {
        var res = JSON.parse(decodeURIComponent(resJSON));
        var text = "🧪 *معمل الكيمياء الذكي* 🧪\n\n" +
                   "لقد قمت بإجراء تفاعل:\n" +
                   "✅ *" + res.full + " → " + res.result + "*\n\n" +
                   "📝 *الملاحظة:* " + res.note + "\n\n" +
                   "🚀 جرب معملك الخاص الآن:";
        
        var url = window.location.href;
        var whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(text + "\n" + url);
        window.open(whatsappUrl, '_blank');
    } catch(e) {
        console.log("خطأ في المشاركة");
    }
}

/* ============================================================
   6. نظام التشغيل الرئيسي
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 تشغيل معمل الكيمياء الذكي...");
    
    // 1. بناء الجدول الدوري
    if (typeof buildCompleteSystem === 'function') buildCompleteSystem();

    // 2. تفعيل الميزات الجديدة
    setTimeout(() => {
        populateDatalist();
        setupElementSearch();
        setupManualInputs();
        console.log("✅ تم تفعيل التحديثات الجديدة");
    }, 500);

    // 3. تفعيل سحب البطاقة (معطل)
    var card = document.querySelector(".details-card");
    if (card && typeof makeDraggable === 'function') makeDraggable(card);

    // 4. بناء الرف السريع
    if (typeof initializeQuickShelf === 'function') initializeQuickShelf();
    
    // 5. تفعيل البحث في الرف
    var searchInput = document.getElementById('shelf-search');
    if (searchInput) {
        searchInput.onkeyup = function() { filterShelfOnly(this); };
    }
    
    // 6. تفعيل الإضاءة على الخانة النشطة
    updateActiveSlotHighlight();
    
    // 7. ربط أزرار التحكم
    var btnReact = document.getElementById("react-btn") || document.querySelector('.btn-lab.react');
    var btnHeat = document.getElementById("heat-btn") || document.querySelector('.btn-lab.heat');
    var btnRedox = document.getElementById("redox-btn") || document.querySelector('.btn-lab.redox');
    var btnClear = document.getElementById("clear-btn") || document.querySelector('.btn-lab.clear');

    if (btnReact) btnReact.onclick = processReaction;
    if (btnHeat) btnHeat.onclick = processHeat;
    if (btnRedox) btnRedox.onclick = processRedox;
    if (btnClear) btnClear.onclick = clearLab;
    
    // 8. ربط حقل الكتلة المولية
    var formulaInput = document.getElementById('formula-input');
    if (formulaInput) {
        formulaInput.onkeyup = function() {
            if (typeof showMolarResult === 'function') showMolarResult();
        };
    }
    
    var molarBtn = document.getElementById("molar-btn") || document.querySelector('.btn-lab.react');
    if (molarBtn) molarBtn.onclick = showMolarResult;

    // 9. عرض رسالة ترحيب
    var report = document.getElementById('lab-report');
    if (report && report.innerHTML.trim() === '') {
        report.innerHTML = '<div style="color:#888; border:2px dashed #444; padding:20px; border-radius:10px; text-align:center;">🧪 مرحباً بك في معمل الكيمياء الذكي<br>اختر المواد من القائمة أو الرف السريع وابدأ التجربة</div>';
    }
    
    console.log("✅ تم تشغيل جميع الأنظمة بنجاح");
});

// تصدير المتغيرات العامة
window.selectElement = selectElement;
window.processReaction = processReaction;
window.processHeat = processHeat;
window.processRedox = processRedox;
window.clearLab = clearLab;
window.showMolarResult = showMolarResult;
window.calculateMolarMass = calculateMolarMass;
window.fillInput = fillInput;
window.filterShelfOnly = filterShelfOnly;
window.shareResult = shareResult;
window.activeSlotId = activeSlotId;
