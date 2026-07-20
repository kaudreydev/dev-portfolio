interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly PUBLIC_ALTCHA_TEST: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
