import path from 'node:path'

const CATEGORY_EXTENSIONS: Record<string, readonly string[]> = {
  Video: [
    'mp4',
    'mkv',
    'avi',
    'mov',
    'wmv',
    'flv',
    'webm',
    'm4v',
    'ts',
    'rmvb',
  ],
  Music: ['mp3', 'flac', 'aac', 'ogg', 'wav', 'wma', 'm4a', 'opus'],
  Images: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'webp',
    'svg',
    'ico',
    'avif',
    'heic',
  ],
  Documents: [
    'pdf',
    'doc',
    'docx',
    'txt',
    'epub',
    'mobi',
    'rtf',
    'md',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'csv',
    'odt',
  ],
  Archives: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'zst'],
  Programs: [
    'exe',
    'msi',
    'msix',
    'dmg',
    'pkg',
    'deb',
    'rpm',
    'appimage',
    'apk',
  ],
}

/** Only a fixed folder name can be appended; remote names never become paths. */
export function categorizedSaveDirectory(
  root: string,
  filename: string,
  enabled: boolean
): string {
  if (!enabled) return root
  const extension = path.extname(filename).slice(1).toLowerCase()
  const category =
    Object.entries(CATEGORY_EXTENSIONS).find(([, extensions]) =>
      extensions.includes(extension)
    )?.[0] ?? 'Others'
  return path.join(root, category)
}
