import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatbotComponent {
  
  // Chatbot əsas ayarları
  chatbotSettings = {
    enabled: true,
    responseDelay: 2,
    language: 'az',
    workingHours: {
      enabled: true,
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Baku'
    }
  };

  // Cavab şablonları
  responseTemplates = [
    {
      id: 1,
      trigger: 'salam',
      response: 'Salam! SalyMed klinikinə xoş gəlmisiniz. Sizə necə kömək edə bilərəm?',
      category: 'salamlama',
      active: true
    },
    {
      id: 2,
      trigger: 'randevu',
      response: 'Randevu üçün lütfən adınızı və soyadınızı, həmçinin hansı həkimə randevu istədiyinizi bildirin.',
      category: 'randevu',
      active: true
    },
    {
      id: 3,
      trigger: 'qiymət',
      response: 'Xidmət qiymətləri barədə məlumat üçün klinikin administratoru ilə əlaqə saxlayın: +994501234567',
      category: 'qiymet',
      active: true
    },
    {
      id: 4,
      trigger: 'iş saatları',
      response: 'Klinikin iş saatları: Bazar ertəsi - Cümə: 09:00-18:00, Şənbə: 09:00-14:00, Bazar günü istirahət',
      category: 'info',
      active: true
    }
  ];

  // Avtomatik cavab növləri
  autoResponseTypes = [
    {
      id: 'appointment',
      name: 'Randevu İstəkləri',
      description: 'Randevu istəyən xəstələrə avtomatik cavab verir',
      enabled: true,
      keywords: ['randevu', 'görüş', 'müayinə', 'həkim'],
      response: 'Randevu üçün lütfən adınızı və telefon nömrənizi bildirin. Administratorumuz sizinlə əlaqə saxlayacaq.'
    },
    {
      id: 'info',
      name: 'Ümumi Məlumat',
      description: 'Klinik haqqında ümumi sualları cavablandırır',
      enabled: true,
      keywords: ['klinik', 'xidmət', 'məlumat', 'haqqında'],
      response: 'SalyMed kliniki 2015-ci ildən fəaliyyət göstərir. Bizim komandamız təcrübəli həkimlərdən ibarətdir.'
    },
    {
      id: 'emergency',
      name: 'Təcili Hallar',
      description: 'Təcili tibbi yardım istəklərinə cavab verir',
      enabled: true,
      keywords: ['təcili', 'emergency', 'ağrı', 'yardım'],
      response: '⚠️ Təcili tibbi yardım üçün 103 nömrəsini yığın və ya yaxın təcili tibbi yardım məntəqəsinə müraciət edin!'
    }
  ];

  // Yeni şablon əlavə etmək
  newTemplate = {
    trigger: '',
    response: '',
    category: 'info'
  };

  showAddTemplate = false;

  // Metodlar
  saveSettings() {
    console.log('Chatbot ayarları saxlanıldı:', this.chatbotSettings);
    // Buraya API çağırışı əlavə olunacaq
  }

  toggleAutoResponse(type: any) {
    type.enabled = !type.enabled;
    console.log(`${type.name} ${type.enabled ? 'aktiv' : 'deaktiv'} edildi`);
  }

  addTemplate() {
    if (this.newTemplate.trigger && this.newTemplate.response) {
      const template = {
        id: this.responseTemplates.length + 1,
        trigger: this.newTemplate.trigger,
        response: this.newTemplate.response,
        category: this.newTemplate.category,
        active: true
      };
      
      this.responseTemplates.push(template);
      this.newTemplate = { trigger: '', response: '', category: 'info' };
      this.showAddTemplate = false;
    }
  }

  editTemplate(template: any) {
    console.log('Şablon redaktə edilir:', template);
    // Redaktə modalı açılacaq
  }

  deleteTemplate(id: number) {
    this.responseTemplates = this.responseTemplates.filter(t => t.id !== id);
  }

  toggleTemplate(template: any) {
    template.active = !template.active;
  }

  testChatbot() {
    console.log('Chatbot test edilir...');
    // Test modalı açılacaq
  }
}