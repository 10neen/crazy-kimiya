
/* ============================================================
   1. مصنع الخلايا وبناء الجدول الدوري
   ============================================================ */

// تحديد كلاس العنصر بناءً على نوعه (للتنسيق اللوني)
function getGroupClass(type_ar) {
    if (!type_ar) return "transition";
    if (type_ar.includes("لانتانيد")) return "lanthanide"; 
    if (type_ar.includes("أكتينيد")) return "actinide";    
    if (type_ar.includes("غاز خامل") || type_ar.includes("نبيل")) return "noble";      
    if (type_ar.includes("هالوجين") || type_ar.includes("شبه فلز") || type_ar.includes("لا فلز")) return "yellow-group"; 
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

    // جلب البيانات من MAP الموجودة في database.js
    var data = (typeof MAP !== 'undefined') ? MAP[sym] : null;
    if (!data) return div;

    var gClass = getGroupClass(data.type_ar);
    div.className = "element " + gClass;
    div.dataset.symbol = sym;
    
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
        'd-symbol': data.sym, 'd-number': data.Z, 'd-mass': data.mass,
        'd-name': data.name_ar, 'd-type': data.type_ar, 'd-state': data.state_ar,
        'd-mp': data.melting_ar, 'd-bp': data.boiling_ar, 'd-density': data.density_ar,
        'd-electrons': data.electron_config_ar, 'd-uses': data.uses_ar
    };

    // تعبئة البيانات في الـ HTML
    for (var id in fields) {
        var dom = document.getElementById(id);
        if (dom) dom.textContent = (fields[id] && fields[id] !== "undefined") ? fields[id] : "—";
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
    // جلب القيم مع حذف المسافات الزائدة وتوحيد حالة الأحرف
    var s1 = document.getElementById('slot-1').value.trim();
    var s2 = document.getElementById('slot-2').value.trim();
    var report = document.getElementById('lab-report');

    if (!s1 && mode !== 'heat') return;

    var res = null;
    
    // بناء استعلام البحث مع ترتيب أبجدي لضمان أن A+B هي نفسها B+A
    // الفلتر يضمن عدم إضافة "+" إذا كانت إحدى الخانات فارغة
    var query = [s1, s2].sort().filter(function(x) { return x !== ""; }).join('+');

    if (typeof CHEMISTRY_DATABASE !== 'undefined') {
        if (mode === 'react') res = CHEMISTRY_DATABASE.specialReactions[query];
        
        if (mode === 'heat') {
            // البحث عن المادة الموجودة في أي من الخانتين بقسم التسخين
            res = CHEMISTRY_DATABASE.heatLibrary[s1] || CHEMISTRY_DATABASE.heatLibrary[s2];
        }
        
        if (mode === 'redox') {
            res = CHEMISTRY_DATABASE.redoxLibrary[query];
        }
    }

    // استدعاء دالة العرض الأصلية الخاصة بك
    renderLabResult(res, mode, report);
}



/* --- وظيفة عرض نواتج المعمل (محدثة بالصوت والاهتزاز) --- */
function renderLabResult(res, type, container) {
    if (!container) return;
    
    if (res) {
        // 1. تشغيل الصوت فوراً بناءً على الملاحظة
        if (typeof playLabSound === 'function') {
            playLabSound(res.note);
        }

        // 2. إضافة تأثير اهتزاز للمعمل لو فيه "فرقعة" أو "انفجار"
        if (res.note.includes("فرقعة") || res.note.includes("انفجار")) {
            const labWindow = document.querySelector('.molar-calculator') || container; 
            labWindow.style.animation = "shake 0.5s ease-in-out";
            setTimeout(() => { labWindow.style.animation = ""; }, 500);
        }

        var themeColor = (type === 'heat') ? "#e67e22" : (type === 'redox' ? "#9b59b6" : "#27ae60");
        
        var bgColor = "#ffffff"; 
        var textColor = "#333";

        // كشف الألوان البصري (تعديل بسيط ليناسب واجهتك الداكنة)
        if (res.note.includes("بني محمر")) bgColor = "#fdebd0"; 
        if (res.note.includes("أزرق")) bgColor = "#ebf5fb";
        if (res.note.includes("أخضر")) bgColor = "#e9f7ef";
        if (res.note.includes("أصفر")) bgColor = "#fef9e7";
        if (res.note.includes("أسود")) { bgColor = "#2c3e50"; textColor = "#fff"; }

        container.innerHTML = 
            '<div class="res-box ' + type + '" style="padding:25px; background:' + bgColor + '; color:' + textColor + '; border-radius:15px; text-align:right; border-right: 10px solid ' + themeColor + '; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transition: all 0.5s ease;">' +
                '<div class="badge" style="background:' + themeColor + '; color:white; padding:5px 15px; border-radius:20px; display:inline-block; font-weight:bold; margin-bottom:15px;">✨ نتيجة المختبر</div>' +
                '<h2 style="font-size:2.2rem; margin:10px 0; font-family: Consolas, monospace; direction: ltr; text-align: center; letter-spacing: 1px;">' + res.full + ' &rarr; ' + res.result + '</h2>' +
                '<div style="height:2px; background:rgba(0,0,0,0.05); margin:15px 0;"></div>' +
                '<p style="font-size:1.2rem; line-height:1.6;"><strong>📝 الملاحظة:</strong> ' + res.note + '</p>' +
            '</div>';
            
        container.style.animation = "none";
        setTimeout(function() { container.style.animation = "fadeInUp 0.4s ease forwards"; }, 10);

    } else {
        // تشغيل صوت الخطأ لو التفاعل مش موجود
        if (typeof playLabSound === 'function') playLabSound("خطأ");
        container.innerHTML = '<div style="background:#fff3f3; color:#c0392b; padding:20px; border-radius:12px; border:2px dashed #c0392b; text-align:right;">⚠️ هذا التفاعل غير مسجل. جرب خلط مواد أخرى!</div>';
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

    // تصحيح الحروف تلقائياً: h2so4 -> H2SO4
    let corrected = input.replace(/([a-z])([a-z]*)/gi, function(match) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });

    // استدعاء دالة الحساب (تأكد أنها موجودة في الكتلة التالية أو السابقة)
    const mass = (typeof calculateMolarMass === 'function') ? calculateMolarMass(corrected) : 0;
    
    if (mass > 0) {
        resultDiv.innerHTML = 
            '<div style="background: rgba(0, 255, 136, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #00ff88; color: #fff;">' +
                'الكتلة المولية لـ (<strong>' + corrected + '</strong>): ' +
                '<span style="font-size: 1.6rem; color: #00ff88; font-weight: bold; margin: 0 10px;">' + mass + '</span> جم/مول' +
            '</div>';
    } else {
        resultDiv.innerHTML = '<span style="color: #ff4444;">⚠️ خطأ في الصيغة! تأكد من كتابة الرموز (مثل NaCl).</span>';
    }
}





/* ============================================================
   3. المنطق الرياضي ونظام التشغيل النهائي
   ============================================================ */

/**
 * المحرك الرياضي: يحسب الكتلة المولية مع دعم التصحيح التلقائي
 * مثال: h2so4 -> H2SO4 -> 98.079
 */
function calculateMolarMass(formula) {
    if (!formula) return 0;

    // 1. تصحيح ذكي: تحويل أي حرف صغير يتبع رقم إلى كبير (مثل h2 -> H2)
    let fixedFormula = formula.replace(/(\d)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    
    // 2. ضمان أن الحرف الأول دائماً Capital
    fixedFormula = fixedFormula.charAt(0).toUpperCase() + fixedFormula.slice(1);

    // 3. التفكيك باستخدام Regex للبحث عن العناصر وأعدادها
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let totalMass = 0, foundAny = false;
    let match;

    while ((match = regex.exec(fixedFormula)) !== null) {
        let symbol = match[1];
        let count = parseInt(match[2]) || 1;
        
        // جلب الكتلة الذرية من قاعدة بيانات العناصر MAP
        if (typeof MAP !== 'undefined' && MAP[symbol]) {
            totalMass += parseFloat(MAP[symbol].mass) * count;
            foundAny = true;
        }
    }
    return foundAny ? totalMass.toFixed(3) : 0;
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
 * نظام التشغيل: يتم استدعاؤه فور تحميل الصفحة
 */
document.addEventListener('DOMContentLoaded', function() {
    // أ. بناء الجدول الدوري
    if (typeof buildCompleteSystem === 'function') buildCompleteSystem();

    // ب. تفعيل سحب البطاقة (Draggable)
    var card = document.querySelector(".details-card");
    if (card && typeof makeDraggable === 'function') makeDraggable(card);

    // ج. ملء قوائم المعمل (Slots) بالعناصر والمركبات
    var slots = [document.getElementById("slot-1"), document.getElementById("slot-2")];
    var compounds = getUniqueCompounds();

    slots.forEach(function(slot) {
        if (!slot) return;
        slot.innerHTML = '<option value="">-- اختر مادة --</option>';
        
        // 1. إضافة العناصر من ELEMENTS
        if (typeof ELEMENTS !== 'undefined') {
            ELEMENTS.forEach(function(el) {
                var opt = document.createElement("option");
                opt.value = el.sym;
                opt.text = "⚛️ " + el.sym + " - " + el.name_ar;
                slot.appendChild(opt);
            });
        }

        // 2. إضافة فاصل بصري
        var sep = document.createElement("option");
        sep.disabled = true;
        sep.text = "────────── مركبات ──────────";
        slot.appendChild(sep);

        // 3. إضافة المركبات المستخرجة تلقائياً
        compounds.forEach(function(comp) {
            // نتجنب تكرار العناصر التي أضيفت بالأعلى
            var isElement = ELEMENTS && ELEMENTS.some(e => e.sym === comp);
            if (!isElement) {
                var opt = document.createElement("option");
                opt.value = comp;
                opt.text = "🧪 " + comp;
                slot.appendChild(opt);
            }
        });

        // د. تفعيل التحديث التلقائي عند تغيير الاختيار
        slot.onchange = function() {
            if (typeof processReaction === 'function') processReaction();
        };
    });

    // هـ. ربط أزرار التحكم
    var btnReact = document.getElementById("react-btn");
    var btnHeat = document.getElementById("heat-btn");
    var btnClear = document.getElementById("clear-btn");

    if (btnReact) btnReact.onclick = processReaction;
    if (btnHeat) btnHeat.onclick = processHeat;
    if (btnClear) btnClear.onclick = clearLab;
    
    // و. بناء الرف السريع (إذا وجد)
    if (typeof initializeQuickShelf === 'function') initializeQuickShelf();
});

/**
 * تصفير المعمل
 */
function clearLab() {
    var s1 = document.getElementById('slot-1');
    var s2 = document.getElementById('slot-2');
    var report = document.getElementById('lab-report');
    
    if (s1) s1.selectedIndex = 0;
    if (s2) s2.selectedIndex = 0;
    if (report) report.innerHTML = '<div style="color:#888; border:2px dashed #333; padding:20px; border-radius:10px;">المعمل جاهز.. اختر المواد وابدأ التفاعل</div>';
}



/* ============================================================
   4. محرك الرف الذكي ونظام السحب (UI Interaction)
   ============================================================ */

// مصفوفة المركبات الأكثر استخداماً (تظهر في الرف العلوي)
var QUICK_COMPOUNDS = [
    "CH4", "C2H4", "C2H2", "C2H5OH", "CH3COOH", 
    "Fe2O3", "Fe3O4", "FeO", "FeSO4", "FeCl3", "Fe(OH)3", "FeC2O4", 
    "CuO", "NaOH", "HCl", "H2SO4", "AgNO3", "BaCl2", "Na2CO3", "KI", "Pb(NO3)2", "KMnO4"
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

    // 2. سحب أي مركب مضاف حديثاً في قاعدة البيانات تلقائياً
    if (typeof CHEMISTRY_DATABASE !== 'undefined') {
        var libs = [CHEMISTRY_DATABASE.specialReactions, CHEMISTRY_DATABASE.heatLibrary, CHEMISTRY_DATABASE.redoxLibrary];
        libs.forEach(lib => {
            if (lib) {
                Object.keys(lib).forEach(key => {
                    key.split('+').forEach(item => { if (item.trim()) allItems.add(item.trim()); });
                });
            }
        });
    }

    shelf.innerHTML = ""; // تنظيف الرف قبل البناء
    
    Array.from(allItems).sort().forEach(function(comp) {
        var btn = document.createElement("button");
        btn.textContent = comp;
        
        // التنسيق النيوني المتوافق مع الواجهة
        btn.style.cssText = "padding:8px 14px; margin:5px; cursor:pointer; background:#1a1a1a; color:#00d4ff; border:1px solid #00d4ff; border-radius:6px; font-weight:bold; transition: 0.3s; font-family: 'Segoe UI', sans-serif;";
        
        // تأثيرات الحركية
        btn.onmouseover = function() { this.style.background = "#00d4ff"; this.style.color = "#000"; this.style.boxShadow = "0 0 10px #00d4ff"; };
        btn.onmouseout = function() { this.style.background = "#1a1a1a"; this.style.color = "#00d4ff"; this.style.boxShadow = "none"; };

        // منطق الضغطة الواحدة (تفاعل + كتلة + تبديل)
        btn.onclick = function() {
            var targetSlot = document.getElementById(activeSlotId);
            if (targetSlot) {
                // التأكد من وجود الخيار في القائمة أو إضافته
                if (!Array.from(targetSlot.options).some(opt => opt.value === comp)) {
                    var newOpt = document.createElement("option");
                    newOpt.value = comp; newOpt.text = "🧪 " + comp;
                    targetSlot.add(newOpt);
                }
                targetSlot.value = comp;
                
                // تشغيل التفاعل وحساب الكتلة فوراً
                if (typeof processReaction === 'function') processReaction();
                
                var molarInput = document.getElementById('formula-input');
                if (molarInput) {
                    molarInput.value = comp;
                    if (typeof showMolarResult === 'function') showMolarResult();
                }

                // التبديل التلقائي للخانة التالية
                activeSlotId = (activeSlotId === 'slot-1') ? 'slot-2' : 'slot-1';
            }
        };
        shelf.appendChild(btn);
    });
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

// تشغيل المحرك عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    window.activeSlotId = 'slot-1';
    initializeQuickShelf();
    
    var card = document.querySelector(".details-card");
    if (card) makeDraggable(card);
});



/* ============================================================
   1. محرك حساب الكتلة المولية الذكي (يدعم الأقواس والحروف الصغيرة)
   ============================================================ */
function calculateMolarMass(formula) {
    if (!formula) return 0;

    // أ. معالجة الأقواس: (NO3)2 تتحول برمجياً لـ N2O6 لسهولة الحساب
    let processed = formula.replace(/\(([^)]+)\)(\d+)/g, (match, content, multiplier) => {
        return content.replace(/([A-Z][a-z]*)(\d*)/g, (m, sym, num) => {
            let count = (parseInt(num) || 1) * parseInt(multiplier);
            return sym + count;
        });
    });

    // ب. تصحيح ذكي للحروف: تحويل h2 لـ H2 و o4 لـ O4 أوتوماتيكياً
    processed = processed.replace(/(\d)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    if (processed[0]) processed = processed[0].toUpperCase() + processed.slice(1);

    const regex = /([A-Z][a-z]*)(\d*)/g;
    let totalMass = 0, found = false;
    let match;

    while ((match = regex.exec(processed)) !== null) {
        let symbol = match[1];
        let count = parseInt(match[2]) || 1;
        
        // البحث في قاعدة بيانات العناصر (MAP)
        if (typeof MAP !== 'undefined' && MAP[symbol]) {
            totalMass += parseFloat(MAP[symbol].mass) * count;
            found = true;
        }
    }
    return found ? totalMass.toFixed(3) : 0;
}

/* ============================================================
   2. وظيفة عرض نتيجة الكتلة والمشاركة
   ============================================================ */

function showMolarResult() {
    let input = document.getElementById('formula-input').value.trim();
    const resultDiv = document.getElementById('molar-result');
    
    if (!input) {
        resultDiv.innerHTML = "";
        return;
    }

    const mass = calculateMolarMass(input);
    
    if (mass > 0) {
        resultDiv.innerHTML = 
            '<div style="background: rgba(0, 212, 255, 0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(0, 212, 255, 0.3); color: #fff;">' +
                '<div style="margin-bottom: 10px;">' +
                    'الكتلة المولية لـ (<strong>' + input.toUpperCase() + '</strong>) هي: ' +
                    '<span style="font-size: 1.8rem; color: #00d4ff; font-weight: bold; margin-left: 10px; text-shadow: 0 0 10px rgba(0,212,255,0.5);">' + mass + '</span> جم/مول' +
                '</div>' +
                '<div style="font-size: 0.85rem; color: #888; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px; margin-top: 8px;">' +
                    '✨ <em>ملاحظة: هذه القيمة دقيقة برمجياً؛ قد تختلف بشكل طفيف جداً عن التقريبات المدرسية.</em>' +
                '</div>' +
            '</div>';
    } else {
        resultDiv.innerHTML = '<span style="color: #ff4444;">⚠️ صيغة غير مكتملة..</span>';
    }
}

// دالة مشاركة النتيجة عبر واتساب
function shareResult(res) {
    var text = "🧪 *معمل الكيمياء الذكي* 🧪\n\n" +
               "لقد قمت بإجراء تفاعل:\n" +
               "✅ *" + res.full + " → " + res.result + "*\n\n" +
               "📝 *الملاحظة:* " + res.note + "\n\n" +
               "🚀 جرب معملك الخاص الآن:";
    
    var url = window.location.href;
    var whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(text + "\n" + url);
    window.open(whatsappUrl, '_blank');
}

/* ============================================================
   3. المحرك الموحد: البحث + الحساب اللحظي
   ============================================================ */


/* ============================================================
   محرك البحث الذكي: يفلتر الرف + يحسب الكتلة فوراً
   ============================================================ */
function filterShelfOnly(searchInput) {
    let query = searchInput.value.toLowerCase().trim();
    let buttons = document.querySelectorAll('#quick-shelf button');
    const resultDiv = document.getElementById('molar-result');
    const molarInput = document.getElementById('formula-input');

    // 1. حالة البحث الفارغ: إظهار كل الأزرار ومسح النتائج
    if (query === "") {
        buttons.forEach(btn => btn.style.display = "inline-block");
        if (resultDiv) resultDiv.innerHTML = "";
        return;
    }

    // 2. فلترة أزرار الرف (المركبات والعناصر)
    buttons.forEach(btn => {
        let btnText = btn.innerText.toLowerCase();
        // إظهار الزر فقط إذا كان يحتوي على نص البحث
        btn.style.display = btnText.includes(query) ? "inline-block" : "none";
    });

    // 3. الحساب التلقائي أثناء الكتابة (Real-time Calculation)
    if (typeof calculateMolarMass === 'function') {
        const mass = calculateMolarMass(query);
        if (mass > 0) {
            // مزامنة النص مع خانة الكتلة وعرض النتيجة فوراً
            if (molarInput) molarInput.value = query.toUpperCase(); 
            showMolarResult();
        } else {
            // مسح النتيجة إذا كانت الصيغة غير مكتملة (مثل كتابة "H" فقط)
            if (resultDiv) resultDiv.innerHTML = "";
        }
    }
}

/**
 * دالة ملء الخانات عند الضغط على أزرار الرف (التي أرسلتها أنت)
 */
function fillInput(val) {
    // أ. تحديث خانة الكتلة المولية وحسابها
    const molarInput = document.getElementById('formula-input');
    if (molarInput) {
        molarInput.value = val;
        if (typeof showMolarResult === 'function') showMolarResult();
    }

    // ب. تحديث خانات التفاعل (Slot 1 & 2) بالتبادل
    if (typeof activeSlotId === 'undefined') window.activeSlotId = 'slot-1';
    const targetSlot = document.getElementById(activeSlotId);
    
    if (targetSlot) {
        targetSlot.value = val;
        // تشغيل محرك التفاعلات تلقائياً
        if (typeof processReaction === 'function') processReaction();
        
        // تبديل الخانة للمرة القادمة (Toggle)
        window.activeSlotId = (window.activeSlotId === 'slot-1') ? 'slot-2' : 'slot-1';
    }
}



function playLabSound(note) {
    let audio = new Audio();
    
    // تأكد أن المجلد اسمه sounds والملفات جواه بنفس الأسماء دي
    if (note.includes("غاز") || note.includes("فوران")) {
        audio.src = "sounds/fizz.mp3"; 
    } else if (note.includes("فرقعة") || note.includes("انفجار")) {
        // ممكن نختار pop1 أو pop2 عشوائي أو نثبت واحد
        audio.src = "sounds/pop1.mp3";
    } else {
        audio.src = "sounds/success.mp3"; 
    }
    
    // التحكم في مستوى الصوت عشان ميكونش مزعج
    audio.volume = 0.5; 
    
    audio.play().catch(e => {
        console.log("تنبيه: المتصفح يمنع الصوت حتى يتفاعل المستخدم مع الصفحة.");
    });
}
