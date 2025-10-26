#!/usr/bin/env node
/**
 * Offline Copilot - 100% Offline AI Coding Assistant
 * Created by IraitzZZ
 * Licensed under MIT
 */

import { Command } from "commander"
import chalk from "chalk"
import { processFile } from "./commands/process"
import { scanProject } from "./commands/scan"
import { showLogo } from "./utils/branding"
import { checkModel } from "./utils/model-manager"

const program = new Command()

// Show logo on startup
showLogo()

program
  .name("offline-copilot")
  .description(chalk.white("A 100% offline AI coding assistant powered by local language models"))
  .version("1.0.0")
  .addHelpText("after", chalk.gray("\nPowered by IraitzZZ"))

program
  .command("process")
  .description("Process a file and generate code from @copilot comments")
  .argument("<file>", "File to process")
  .option("-y, --yes", "Skip confirmation prompts")
  .option("-d, --dry-run", "Show changes without applying them")
  .action(async (file: string, options: { yes?: boolean; dryRun?: boolean }) => {
    try {
      await checkModel()
      await processFile(file, options)
    } catch (error) {
      console.error(chalk.red("Error:"), error instanceof Error ? error.message : "Unknown error")
      process.exit(1)
    }
  })

program
  .command("scan")
  .description("Scan project for @copilot comments")
  .argument("[directory]", "Directory to scan", ".")
  .option("-p, --pattern <pattern>", "File pattern to match", "**/*.{js,ts,py,java,cpp,c,go,rs}")
  .action(async (directory: string, options: { pattern?: string }) => {
    try {
      await checkModel()
      await scanProject(directory, options)
    } catch (error) {
      console.error(chalk.red("Error:"), error instanceof Error ? error.message : "Unknown error")
      process.exit(1)
    }
  })

program
  .command("init")
  .description("Initialize Offline Copilot and download the model")
  .action(async () => {
    try {
      const { downloadModel } = await import("./utils/model-manager")
      await downloadModel()
      console.log(chalk.green("\n✓ Offline Copilot initialized successfully!"))
      console.log(chalk.gray("Powered by IraitzZZ\n"))
    } catch (error) {
      console.error(chalk.red("Error:"), error instanceof Error ? error.message : "Unknown error")
      process.exit(1)
    }
  })

program.parse()
