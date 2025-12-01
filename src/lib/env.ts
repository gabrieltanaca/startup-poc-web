function validateEnv() {
    const requiredEnvVars = {
        SESSION_SECRET: process.env.SESSION_SECRET,
    };

    const missing: string[] = [];

    for (const [key, value] of Object.entries(requiredEnvVars)) {
        if (!value) {
            missing.push(key);
        }
    }

    if (missing.length > 0) {
        console.error(
            `❌ Variáveis de ambiente obrigatórias não definidas: ${missing.join(', ')}`
        );
        console.error('Configure estas variáveis no seu arquivo .env ou no painel do AWS Amplify');
    }

    return missing.length === 0;
}

if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
    validateEnv();
}

export { validateEnv };
