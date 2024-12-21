export { }

export type Roles = 'admin' | 'member'

declare global {
    interface ClerkAuthorization {
        permission: ''
        role: 'org:admin' | 'org:member'
    }
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}