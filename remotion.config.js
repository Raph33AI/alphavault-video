import { Config } from '@remotion/cli/config';

// Image format for better quality
Config.setVideoImageFormat('jpeg');

// Overwrite existing output
Config.setOverwriteOutput(true);

// Concurrency for faster rendering
Config.setConcurrency(4);

// Browser executable (for GitHub Actions)
Config.setBrowserExecutable(process.env.PUPPETEER_EXECUTABLE_PATH);

// Timeout for long renders
Config.setTimeoutInMilliseconds(300000); // 5 minutes

// Codec settings
Config.setCodec('h264');

// Quality settings (18 = high quality, lower = better quality but larger file)
Config.setCrf(18);

// Pixel format for compatibility
Config.setPixelFormat('yuv420p');

// Enable multi-process rendering
Config.setEnforceAudioTrack(false);

// Log level
Config.setLogLevel('info');

export default Config;