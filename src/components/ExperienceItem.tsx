import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

interface ExperienceItemProps {
  experience: Experience;
  onDelete: (id: string) => void;
  onAdd: () => void;
  isLast: boolean;
  onChange: (id: string, field: keyof Experience, value: string) => void;
}

export default function ExperienceItem({ experience, onDelete, onAdd, isLast, onChange }: ExperienceItemProps) {
  return (
    <div className="space-y-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şirket Adı
            </label>
            <input
              type="text"
              value={experience.company}
              onChange={(e) => onChange(experience.id, 'company', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Şirket adı"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pozisyon
            </label>
            <input
              type="text"
              value={experience.position}
              onChange={(e) => onChange(experience.id, 'position', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Pozisyon"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dönem
            </label>
            <input
              type="text"
              value={experience.period}
              onChange={(e) => onChange(experience.id, 'period', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Örn: 2020 - 2023"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <textarea
              value={experience.description}
              onChange={(e) => onChange(experience.id, 'description', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="İş tanımı ve sorumluluklar"
              rows={3}
            />
          </div>
        </div>
        
        <button
          onClick={() => onDelete(experience.id)}
          className="text-red-400 hover:text-red-600 transition-colors"
          title="Deneyimi Sil"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      {isLast && (
        <button
          onClick={onAdd}
          className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-sm text-blue-500 hover:text-blue-600 transition-colors border border-blue-200 rounded-lg hover:bg-blue-50"
        >
          <Plus className="w-4 h-4" /> Yeni Deneyim Ekle
        </button>
      )}
    </div>
  );
}