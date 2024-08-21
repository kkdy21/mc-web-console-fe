import type { TranslateResult } from 'vue-i18n';
import type { Location } from 'vue-router';

export interface Breadcrumb {
  name: TranslateResult | string;
  to?: Location;
  copiable?: boolean;
  data?: {
    id: string;
    name: string;
  };
}
