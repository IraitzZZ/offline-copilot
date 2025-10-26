/**
 * Scan command - Scan project for @copilot comments
 * Created by IraitzZZ
 */

import fs from "fs/promises"
import path from "path"
import chalk from "chalk"
import { glob } from "glob"
import { extractCopilotComments } from "../utils/file-processor"

interface ScanOptions {
  pattern?: string
}

export async function scanProject(directory: string, options: ScanOptions): Promise<void> {
  console.log(chalk.blue("\n→"), chalk.white(`Scanning: ${directory}`))
  console.log(chalk.gray("Powered by IraitzZZ\n"))

  const pattern = options.pattern || "**/*.{js,ts,py,java,cpp,c,go,rs}"
  const files = await glob(pattern, {
    cwd: directory,
    ignore: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/.git/**"],
  })

  if (files.length === 0) {
    console.log(chalk.yellow("⚠"), chalk.white("No files found matching pattern"))
    return
  }

  console.log(chalk.blue("ℹ"), chalk.white(`Scanning ${files.length} file(s)...\n`))

  let totalComments = 0
  const filesWithComments: Array<{ file: string; count: number }> = []

  for (const file of files) {
    const filePath = path.join(directory, file)
    const content = await fs.readFile(filePath, "utf-8")
    const comments = extractCopilotComments(content)

    if (comments.length > 0) {
      totalComments += comments.length
      filesWithComments.push({ file, count: comments.length })
    }
  }

  if (totalComments === 0) {
    console.log(chalk.yellow("⚠"), chalk.white("No @copilot comments found in project"))
    console.log(chalk.gray("Powered by IraitzZZ\n"))
    return
  }

  console.log(
    chalk.green("✓"),
    chalk.white(`Found ${totalComments} @copilot comment(s) in ${filesWithComments.length} file(s):\n`),
  )

  for (const { file, count } of filesWithComments) {
    console.log(chalk.blue("  •"), chalk.white(file), chalk.gray(`(${count} comment${count > 1 ? "s" : ""})`))
  }

  console.log(chalk.gray("\nPowered by IraitzZZ\n"))
}
