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
        // البحث في الأقسام الثلاثة حسب النمط (Mode)
        if (mode === 'react') res = CHEMISTRY_DATABASE.specialReactions[query];
        if (mode === 'heat') {
            res = CHEMISTRY_DATABASE.heatLibrary[formula1] || CHEMISTRY_DATABASE.heatLibrary[formula2];
            // لو مفيش تفاعل حراري، جرب في specialReactions كبديل
            if (!res) res = CHEMISTRY_DATABASE.specialReactions[query];
        }
        if (mode === 'redox') res = CHEMISTRY_DATABASE.redoxLibrary[query];
    }

    renderLabResult(res, mode, report, s1, s2);
}

/* --- وظيفة عرض نواتج المعمل (محدثة بالصوت والاهتزاز) --- */
function renderLabResult(res, type, container, s1, s2) {
    if (!container) return;
    
    if (res) {
        // 1. تشغيل الصوت فوراً بناءً على الملاحظة
        if (typeof playLabSound === 'function') {
            playLabSound(res.note);
        }

        // 2. إضافة تأثير اهتزاز للمعمل لو فيه "فرقعة" أو "انفجار"
        if (res.note.includes("فرقعة") || res.note.includes("انفجار") || res.note.includes("بعنف")) {
            const labWindow = document.querySelector('.molar-calculator') || container; 
            labWindow.style.animation = "shake 0.5s ease-in-out";
            setTimeout(() => { labWindow.style.animation = ""; }, 500);
        }

        var themeColor = (type === 'heat') ? "#e67e22" : (type === 'redox' ? "#9b59b6" : "#27ae60");
        
        var bgColor = "#ffffff"; 
        var textColor = "#333";

        // كشف الألوان البصري
        if (res.note.includes("بني محمر") || res.note.includes("بني")) bgColor = "#fdebd0"; 
        if (res.note.includes("أزرق")) bgColor = "#ebf5fb";
        if (res.note.includes("أخضر")) bgColor = "#e9f7ef";
        if (res.note.includes("أصفر")) bgColor = "#fef9e7";
        if (res.note.includes("أسود")) { bgColor = "#2c3e50"; textColor = "#fff"; }
        if (res.note.includes("بنفسجي") || res.note.includes("بنفسج")) bgColor = "#f4ecf7";

        // عرض مستوى التفاعل لو موجود
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
        // تشغيل صوت الخطأ لو التفاعل مش موجود
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

    // استدعاء دالة الحساب
    const mass = (typeof calculateMolarMass === 'function') ? calculateMolarMass(corrected) : 0;
    
    if (mass > 0) {
        resultDiv.innerHTML = 
            '<div style="background: rgba(0, 212, 255, 0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(0, 212, 255, 0.3); color: #fff;">' +
                '<div style="display:flex; align-items:center; gap:10px;">' +
                    '<span style="background:#00d4ff; color:#000; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">🧪</span>' +
                    '<div style="flex:1;">' +
                        '<span style="color:#888;">الكتلة المولية لـ </span>' +
                        '<strong style="color:#00d4ff; font-size:1.3rem;">' + corrected + '</strong>' +
                    '</div>' +
                    '<span style="font-size: 1.8rem; color: #00d4ff; font-weight: bold; text-shadow: 0 0 10px rgba(0,212,255,0.5);">' + mass + '</span>' +
                    '<span style="color:#888;">جم/مول</span>' +
                '</div>' +
            '</div>';
    } else {
        resultDiv.innerHTML = '<span style="color: #ff4444;">⚠️ صيغة غير مكتملة أو رمز غير معروف</span>';
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

    // 1. معالجة الأقواس: (NO3)2 تتحول لـ N2O6
    let processed = formula.replace(/\(([^)]+)\)(\d+)/g, (match, content, multiplier) => {
        return content.replace(/([A-Z][a-z]*)(\d*)/g, (m, sym, num) => {
            let count = (parseInt(num) || 1) * parseInt(multiplier);
            return sym + count;
        });
    });

    // 2. تصحيح ذكي للحروف
    processed = processed.replace(/(\d)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    if (processed[0]) processed = processed[0].toUpperCase() + processed.slice(1);

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
 * دالة مسح قاعدة البيانات: تستخرج كل المركبات الفريدة لإضافتها للقوائم
 */
function getUniqueCompounds() {
    var allFound = {};
    if (typeof CHEMISTRY_DATABASE !== 'undefined') {
        var libs = [
            CHEMISTRY_DATABASE.specialReactions,
            CHEMISTRY_DATABASE.heatLibrary,
            CHEMISTRY_DATABASE.redoxLibrary
        ];

        libs.forEach(function(lib) {
            if (lib) {
                Object.keys(lib).forEach(function(fullKey) {
                    fullKey.split('+').forEach(function(item) {
                        var trimmed = item.trim();
                        if (trimmed) allFound[trimmed] = true;
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
    
    if (s1) s1.selectedIndex = 0;
    if (s2) s2.selectedIndex = 0;
    if (report) report.innerHTML = '<div style="color:#888; border:2px dashed #444; padding:20px; border-radius:10px; text-align:center;">🧪 المعمل جاهز.. اختر المواد وابدأ التفاعل</div>';
    if (molarInput) molarInput.value = '';
    if (molarResult) molarResult.innerHTML = '';
    
    // إعادة تفعيل الخانة الأولى
    window.activeSlotId = 'slot-1';
}

/* ============================================================
   4. محرك الرف الذكي ونظام السحب (UI Interaction)
   ============================================================ */

// مصفوفة المركبات الأكثر استخداماً
var QUICK_COMPOUNDS = [
    "H2O", "CO2", "NH3", "CH4", "C2H4", "C2H2", "C2H5OH", "CH3COOH", 
    "Fe2O3", "Fe3O4", "FeO", "FeSO4", "FeCl3", "Fe(OH)3", "FeC2O4", 
    "CuO", "CuSO4", "NaOH", "HCl", "H2SO4", "HNO3", "AgNO3", "BaCl2", 
    "Na2CO3", "NaHCO3", "KI", "KMnO4", "Pb(NO3)2", "CaCO3", "NH4Cl"
];

// المتغير المسؤول عن تحديد أي خانة سيتم تعبئتها (Toggle)
var activeSlotId = 'slot-1';

/**
 * بناء الرف بصرياً وبرمجياً
 */
function initializeQuickShelf() {
    var shelf = document.getElementById("quick-shelf");
    if (!shelf) return;

    var allItems = new Set();
    
    // 1. إضافة القائمة اليدوية
    QUICK_COMPOUNDS.forEach(c => allItems.add(c));

    // 2. سحب أي مركب مضاف حديثاً في قاعدة البيانات
    if (typeof CHEMISTRY_DATABASE !== 'undefined') {
        var libs = [
            CHEMISTRY_DATABASE.specialReactions, 
            CHEMISTRY_DATABASE.heatLibrary, 
            CHEMISTRY_DATABASE.redoxLibrary
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

    shelf.innerHTML = ""; // تنظيف الرف قبل البناء
    
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

/**
 * دالة ملء الخانات عند الضغط على أزرار الرف
 */
function fillInput(val) {
    // 1. تحديث خانة الكتلة المولية وحسابها
    const molarInput = document.getElementById('formula-input');
    if (molarInput) {
        molarInput.value = val;
        if (typeof showMolarResult === 'function') showMolarResult();
    }

    // 2. تحديث خانات التفاعل (Slot 1 & 2) بالتبادل
    if (typeof activeSlotId === 'undefined') window.activeSlotId = 'slot-1';
    const targetSlot = document.getElementById(activeSlotId);
    
    if (targetSlot) {
        // التأكد من وجود الخيار في القائمة
        let found = false;
        for (let i = 0; i < targetSlot.options.length; i++) {
            if (targetSlot.options[i].value === val) {
                targetSlot.selectedIndex = i;
                found = true;
                break;
            }
        }
        
        // لو الخيار مش موجود، نضيفه مؤقتاً
        if (!found) {
            let newOpt = document.createElement("option");
            newOpt.value = val;
            newOpt.text = "🧪 " + val;
            targetSlot.add(newOpt);
            targetSlot.value = val;
        }
        
        // تشغيل محرك التفاعلات تلقائياً
        if (typeof processReaction === 'function') processReaction();
        
        // تبديل الخانة للمرة القادمة
        window.activeSlotId = (window.activeSlotId === 'slot-1') ? 'slot-2' : 'slot-1';
        
        // تحديث واجهة المستخدم لإظهار الخانة النشطة
        updateActiveSlotHighlight();
    }
}

/**
 * تحديث إظهار الخانة النشطة
 */
function updateActiveSlotHighlight() {
    var slot1 = document.getElementById('slot-1');
    var slot2 = document.getElementById('slot-2');
    
    if (slot1) slot1.style.borderColor = window.activeSlotId === 'slot-1' ? '#00d4ff' : '#333';
    if (slot2) slot2.style.borderColor = window.activeSlotId === 'slot-2' ? '#00d4ff' : '#333';
}

/**
 * وظيفة السحب (Draggable) للبطاقات
 */
function makeDraggable(el) {
    var isDragging = false, offsetX, offsetY;
    var header = el.querySelector('.card-header') || el;

    header.style.cursor = "move";
    header.onmousedown = function(e) {
        if (e.target.closest('button, input, select')) return;
        isDragging = true;
        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;
        el.style.zIndex = "1000";
    };

    document.onmousemove = function(e) {
        if (!isDragging) return;
        el.style.position = "fixed";
        el.style.left = (e.clientX - offsetX) + "px";
        el.style.top = (e.clientY - offsetY) + "px";
        el.style.margin = "0";
    };

    document.onmouseup = function() { isDragging = false; };
}

/* ============================================================
   5. محرك البحث الذكي والصوت والمشاركة
   ============================================================ */

/**
 * فلترة الرف حسب البحث
 */
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

    // فلترة أزرار الرف
    buttons.forEach(btn => {
        let btnText = btn.innerText.toLowerCase();
        btn.style.display = btnText.includes(query) ? "inline-block" : "none";
    });

    // الحساب التلقائي أثناء الكتابة
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

/**
 * تشغيل المؤثرات الصوتية
 */
function playLabSound(note) {
    // نتحقق أولاً من وجود مجلد sounds
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

/**
 * مشاركة النتيجة
 */
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

    // 2. تفعيل سحب البطاقة
    var card = document.querySelector(".details-card");
    if (card && typeof makeDraggable === 'function') makeDraggable(card);

    // 3. ملء قوائم المعمل (Slots) بالعناصر والمركبات
    var slots = [document.getElementById("slot-1"), document.getElementById("slot-2")];
    var compounds = getUniqueCompounds();

    slots.forEach(function(slot, index) {
        if (!slot) return;
        slot.innerHTML = '<option value="">-- اختر مادة --</option>';
        
        // إضافة العناصر من ELEMENTS
        if (typeof ELEMENTS !== 'undefined') {
            ELEMENTS.forEach(function(el) {
                // عرض العناصر حسب المستوى (للتبسيط، نعرض كل العناصر)
                var opt = document.createElement("option");
                opt.value = el.sym;
                opt.text = "⚛️ " + el.sym + " - " + el.name_ar;
                slot.appendChild(opt);
            });
        }

        // إضافة فاصل بصري
        var sep = document.createElement("option");
        sep.disabled = true;
        sep.textContent = "────────── مركبات ──────────";
        slot.appendChild(sep);

        // إضافة المركبات
        compounds.forEach(function(comp) {
            var isElement = ELEMENTS && ELEMENTS.some(e => e.sym === comp);
            if (!isElement) {
                var opt = document.createElement("option");
                opt.value = comp;
                opt.text = "🧪 " + comp;
                slot.appendChild(opt);
            }
        });

        // تفعيل التحديث التلقائي عند تغيير الاختيار
        slot.onchange = function() {
            if (typeof processReaction === 'function') processReaction();
        };
    });

    // 4. ربط أزرار التحكم
    var btnReact = document.getElementById("react-btn");
    var btnHeat = document.getElementById("heat-btn");
    var btnRedox = document.getElementById("redox-btn");
    var btnClear = document.getElementById("clear-btn");
    var molarBtn = document.getElementById("molar-btn");

    if (btnReact) btnReact.onclick = processReaction;
    if (btnHeat) btnHeat.onclick = processHeat;
    if (btnRedox) btnRedox.onclick = processRedox;
    if (btnClear) btnClear.onclick = clearLab;
    
    // 5. ربط حقل الكتلة المولية
    var formulaInput = document.getElementById('formula-input');
    if (formulaInput) {
        formulaInput.onkeyup = function(e) {
            if (typeof showMolarResult === 'function') showMolarResult();
        };
    }
    
    if (molarBtn) molarBtn.onclick = showMolarResult;

    // 6. بناء الرف السريع
    if (typeof initializeQuickShelf === 'function') initializeQuickShelf();
    
    // 7. تفعيل البحث
    var searchInput = document.getElementById('shelf-search');
    if (searchInput) {
        searchInput.onkeyup = function() { filterShelfOnly(this); };
    }
    
    // 8. تفعيل الإضاءة على الخانة النشطة
    updateActiveSlotHighlight();
    
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
