import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { categorizedSaveDirectory } from './download-category'

describe('categorizedSaveDirectory', () => {
  it.each([
    ['movie.MP4', 'Video'],
    ['song.flac', 'Music'],
    ['photo.avif', 'Images'],
    ['report.pdf', 'Documents'],
    ['backup.tar.gz', 'Archives'],
    ['setup.exe', 'Programs'],
    ['unknown.bin', 'Others'],
    ['download', 'Others'],
  ])('routes %s to %s', (filename, folder) => {
    expect(categorizedSaveDirectory('/downloads', filename, true)).toBe(
      path.join('/downloads', folder)
    )
  })

  it('preserves the selected root when disabled', () => {
    expect(categorizedSaveDirectory('/custom', 'video.mp4', false)).toBe(
      '/custom'
    )
  })

  it('never uses remote path segments as directories', () => {
    expect(
      categorizedSaveDirectory('/downloads', '../../escape/file.pdf', true)
    ).toBe(path.join('/downloads', 'Documents'))
  })
})
