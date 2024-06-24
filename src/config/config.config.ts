interface ConfigConfig {
  ignoreEnvFile?: boolean;
  envFilePath: string;
  isGlobal: boolean;
}

export const configConfig: ConfigConfig = {
  envFilePath: '.env',
  isGlobal: true,
};
