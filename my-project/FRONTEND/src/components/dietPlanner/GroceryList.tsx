import React, { useState, useEffect } from 'react';
import { Meal, GroceryItem } from '../../types';
import { ShoppingBag, CheckSquare, Square, Download, Printer } from 'lucide-react';

interface GroceryListProps {
  meals: Meal[];
}

export const GroceryList: React.FC<GroceryListProps> = ({ meals }) => {
  const [items, setItems] = useState<GroceryItem[]>([]);

  useEffect(() => {
    // Collect and de-duplicate ingredients from the current diet plan meals
    const allIngredients = new Set<string>();
    meals.forEach(meal => {
      meal.ingredients.forEach(ing => {
        allIngredients.add(ing.trim().toLowerCase());
      });
    });

    // Bucket and build checklist items
    const compiledItems: GroceryItem[] = Array.from(allIngredients).map((ing, idx) => {
      // Capitalize first letter
      const name = ing.charAt(0).toUpperCase() + ing.slice(1);
      
      // Determine Category by keyword matching
      let category = 'Others';
      const grainsKeywords = ['rice', 'quinoa', 'oat', 'barley', 'wheat', 'buckwheat', 'millet', 'flake', 'basmati'];
      const spicesKeywords = ['cardamom', 'cinnamon', 'mint', 'coriander', 'fennel', 'clove', 'ginger', 'nutmeg', 'turmeric', 'cumin', 'pepper', 'garlic', 'salt', 'mustard'];
      const vegKeywords = ['cucumber', 'lime', 'kale', 'asparagus', 'watermelon', 'zucchini', 'apple', 'pear', 'carrot', 'squash', 'broccoli', 'cranberr', 'melon', 'cabbage', 'cauliflower', 'tomato'];
      const fatKeywords = ['ghee', 'oil', 'butter'];
      const dairyKeywords = ['milk', 'dairy', 'cheese', 'curd', 'yogurt', 'honey'];
      const beanKeywords = ['lentil', 'dal', 'mung', 'bean', 'chickpea', 'almond', 'walnut', 'sesame', 'seed', 'raisin'];

      if (grainsKeywords.some(kw => ing.includes(kw))) category = 'Grains & Cereals';
      else if (spicesKeywords.some(kw => ing.includes(kw))) category = 'Spices & Seasonings';
      else if (vegKeywords.some(kw => ing.includes(kw))) category = 'Fruits & Vegetables';
      else if (fatKeywords.some(kw => ing.includes(kw))) category = 'Healthy Fats & Ghee';
      else if (dairyKeywords.some(kw => ing.includes(kw))) category = 'Dairy & Sweeteners';
      else if (beanKeywords.some(kw => ing.includes(kw))) category = 'Pulses, Nuts & Seeds';

      return {
        id: `gro-${idx}`,
        name,
        quantity: '1 Pack / Portion',
        category,
        checked: false
      };
    });

    setItems(compiledItems);
  }, [meals]);

  const toggleCheck = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text content
    let textContent = `AYURVEDA CONNECT - DIET GROCERY LIST\n`;
    textContent += `Generated: ${new Date().toLocaleDateString()}\n`;
    textContent += `==========================================\n\n`;

    const categories = Array.from(new Set(items.map(i => i.category)));
    categories.forEach(cat => {
      textContent += `[ ${cat.toUpperCase()} ]\n`;
      const catItems = items.filter(i => i.category === cat);
      catItems.forEach(item => {
        textContent += `${item.checked ? '[x]' : '[ ]'} ${item.name} (${item.quantity})\n`;
      });
      textContent += `\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ayurveda_Diet_Grocery_List.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const groupByCategory = () => {
    const groups: Record<string, GroceryItem[]> = {};
    items.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  };

  const grouped = groupByCategory();
  const checkedCount = items.filter(i => i.checked).length;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-gray-800">
                Pantry & Grocery List
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Checklist of clean ingredients required for your daily meals
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={handlePrint}
              className="p-2 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 rounded-xl transition-all cursor-pointer font-bold text-xs flex items-center space-x-1"
              title="Print Grocery List"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 rounded-xl transition-all cursor-pointer font-bold text-xs flex items-center space-x-1"
              title="Download Grocery List"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-100/30 flex justify-between items-center text-xs font-bold text-emerald-800 mb-4 shrink-0">
            <span>Progress Checklist</span>
            <span>{checkedCount} / {items.length} Checked</span>
          </div>
        )}

        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
          {items.length === 0 ? (
            <p className="text-xs text-gray-400 italic text-center py-6">No ingredients found. Generate a plan first.</p>
          ) : (
            Object.keys(grouped).map((catName) => (
              <div key={catName} className="space-y-2">
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block border-b border-emerald-50/50 pb-1">
                  {catName}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {grouped[catName].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all text-left cursor-pointer w-full text-xs font-bold ${
                        item.checked
                          ? 'bg-emerald-50/20 border-emerald-200 text-gray-400 line-through'
                          : 'bg-white hover:bg-gray-50 border-gray-100 text-gray-700'
                      }`}
                    >
                      {item.checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-300 shrink-0" />
                      )}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
