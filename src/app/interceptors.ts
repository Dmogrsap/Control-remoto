import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { SuccessCommand } from './profile/profile.interceptor.service'

export const interceptorsProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: SuccessCommand, multi: true }
]