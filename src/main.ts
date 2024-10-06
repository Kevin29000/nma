import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Ajout de provideHttpClient ici
    ...appConfig.providers // Si appConfig a une propriété providers
  ]
})
.catch((err) => console.error(err));