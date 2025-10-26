/**
 * Process command - Handle file processing with @copilot comments
 * Created by IraitzZZ
 */

import fs from "fs/promises"
import chalk from "chalk"
import inquirer from "inquirer"
import ora from "ora"
import { generateCode } from "../ai/generator"
import { extractCopilotComments, applyChanges } from "../utils/file-processor"

interface ProcessOptions {
  yes?: boolean
  dryRun?: boolean
}

export async function processFile(filePath: string, options: ProcessOptions): Promise<void> {
  console.log(chalk.blue("\n→"), chalk.white(`Processing: ${filePath}`))
  console.log(chalk.gray("Powered by IraitzZZ\n"))

  // Check if file exists
  try {
    await fs.access(filePath)
  } catch {
    throw new Error(`File not found: ${filePath}`)
  }

  // Read file content
  const content = await fs.readFile(filePath, "utf-8")

  // Extract @copilot comments
  const comments = extractCopilotComments(content)

  if (comments.length === 0) {
    console.log(chalk.yellow("⚠"), chalk.white("No @copilot comments found in file"))
    return
  }

  console.log(chalk.blue("ℹ"), chalk.white(`Found ${comments.length} @copilot comment(s)\n`))

  // Process each comment
  const changes: Array<{ line: number; instruction: string; generatedCode: string }> = []

  for (const comment of comments) {
    const spinner = ora({
      text: chalk.white(`Generating code for: "${comment.instruction}"`),
      color: "blue",
    }).start()

    try {
      const generatedCode = await generateCode(comment.instruction, content, filePath)
      spinner.succeed(chalk.green(`Generated code for: "${comment.instruction}"`))

      changes.push({
        line: comment.line,
        instruction: comment.instruction,
        generatedCode,
      })
    } catch (error) {
      spinner.fail(chalk.red(`Failed to generate code: ${error instanceof Error ? error.message : "Unknown error"}`))
    }
  }

  if (changes.length === 0) {
    console.log(chalk.yellow("\n⚠"), chalk.white("No code was generated"))
    return
  }

  // Show preview
  console.log(chalk.blue("\n━━━ Preview ━━━\n"))
  for (const change of changes) {
    console.log(chalk.gray(`Line ${change.line}:`), chalk.white(change.instruction))
    console.log(chalk.green("+ Generated code:"))
    console.log(
      chalk.gray(
        change.generatedCode
          .split("\n")
          .map((l) => `  ${l}`)
          .join("\n"),
      ),
    )
    console.log()
  }

  if (options.dryRun) {
    console.log(chalk.yellow("⚠"), chalk.white("Dry run mode - no changes applied"))
    console.log(chalk.gray("Powered by IraitzZZ\n"))
    return
  }

  // Confirm changes
  if (!options.yes) {
    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: chalk.white("Apply these changes?"),
        default: false,
      },
    ])

    if (!confirm) {
      console.log(chalk.yellow("\n⚠"), chalk.white("Changes cancelled"))
      console.log(chalk.gray("Powered by IraitzZZ\n"))
      return
    }
  }

  // Apply changes
  const newContent = applyChanges(content, changes)
  await fs.writeFile(filePath, newContent, "utf-8")

  console.log(chalk.green("\n✓"), chalk.white("Changes applied successfully!"))
  console.log(chalk.gray("Powered by IraitzZZ\n"))
}
