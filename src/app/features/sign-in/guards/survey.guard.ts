import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const surveyGuard = () => {
  const router = inject(Router);
  const surveyCompleted = localStorage.getItem('surveyCompleted') === 'true';

  if (surveyCompleted) {
    return true;
  }

  return router.createUrlTree(['/survey']);
};
