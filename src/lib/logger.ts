const levels = {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
    DEBUG: 'DEBUG',
};

class Logger {
    private level: string;
    
    constructor(level: string = 'INFO') {
        this.level = level;
    }
    
    setLevel(level: string) {
        this.level = level;
    }
    
    log(level: string, message: string) {
        if (levels[level as keyof typeof levels] && levels[level as keyof typeof levels] >= levels[this.level as keyof typeof levels]) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] [${level}]: ${message}`);
        }
    }
    
    error(message: string) {
        this.log('ERROR', message);
    }
    
    warn(message: string) {
        this.log('WARN', message);
    }
    
    info(message: string) {
        this.log('INFO', message);
    }
    
    debug(message: string) {
        this.log('DEBUG', message);
    }
}

const logger = new Logger();
export default logger;