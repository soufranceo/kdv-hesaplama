import React from 'react';

interface Language {
  language: string;
  level: string;
}

interface SkillsSectionProps {
  languages: Language[];
  skills: string[];
  onLanguageChange: (index: number, field: keyof Language, value: string) => void;
  onAddLanguage: () => void;
  onRemoveLanguage: (index: number) => void;
  onSkillsChange: (skills: string[]) => void;
}

export default function SkillsSection({
  languages,
  skills,
  onLanguageChange,
  onAddLanguage,
  onRemoveLanguage,
  onSkillsChange,
}: SkillsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Yabancı Dil Bilgisi</h3>
        <div className="space-y-4">
          {languages.map((lang, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={lang.language}
                onChange={(e) => onLanguageChange(index, 'language', e.target.value)}
                placeholder="Dil"
                className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={lang.level}
                onChange={(e) => onLanguageChange(index, 'level', e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seviye Seçin</option>
                <option value="Başlangıç">Başlangıç</option>
                <option value="Orta">Orta</option>
                <option value="İleri">İleri</option>
                <option value="Anadil">Anadil</option>
              </select>
            </div>
          ))}
          <button
            onClick={onAddLanguage}
            className="w-full py-2 text-sm text-blue-500 hover:text-blue-600 transition-colors"
          >
            + Yeni Dil Ekle
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Beceri ve Yetkinlikler</h3>
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="relative group">
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index] = e.target.value;
                  onSkillsChange(newSkills);
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Beceri ekle"
              />
              <button
                onClick={() => {
                  const newSkills = skills.filter((_, i) => i !== index);
                  onSkillsChange(newSkills);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => onSkillsChange([...skills, ''])}
            className="col-span-2 py-2 text-sm text-blue-500 hover:text-blue-600 transition-colors"
          >
            + Yeni Beceri Ekle
          </button>
        </div>
      </div>
    </div>
  );
}