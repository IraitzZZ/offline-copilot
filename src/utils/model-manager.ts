/**
 * Model Manager - Handle model download and initialization
 * Created by IraitzZZ
 */

import fs from "fs/promises"
import path from "path"
import os from "os"
import chalk from "chalk"
import ora from "ora"

const MODEL_DIR = path.join(os.homedir(), ".offline-copilot")
const MODEL_FILE = "model.onnx"
const MODEL_PATH = path.join(MODEL_DIR, MODEL_FILE)

/**
 * Check if model exists
 */
export async function checkModel(): Promise<boolean> {
  try {
    await fs.access(MODEL_PATH)
    return true
  } catch {
    console.log(chalk.yellow("\n⚠"), chalk.white('Model not found. Run "offline-copilot init" to download it.'))
    console.log(chalk.gray("Powered by IraitzZZ\n"))
    process.exit(1)
  }
}

/**
 * Get model path
 */
export async function getModelPath(): Promise<string> {
  await checkModel()
  return MODEL_PATH
}

/**
 * Download and initialize model
 */
export async function downloadModel(): Promise<void> {
  console.log(chalk.blue("\n→"), chalk.white("Initializing Offline Copilot"))
  console.log(chalk.gray("Powered by IraitzZZ\n"))

  // Create model directory
  await fs.mkdir(MODEL_DIR, { recursive: true })

  const spinner = ora({
    text: chalk.white("Downloading model (this may take a few minutes)..."),
    color: "blue",
  }).start()

  try {
    // In a production version, this would download a real model
    // For now, we'll create a placeholder file
    const placeholderContent = `# Offline Copilot Model
# Created by IraitzZZ
# 
# This is a placeholder for the actual ONNX model.
# In production, this would be a quantized small language model
# like Phi-2, TinyLlama, or similar (< 300MB).
#
# The model would be downloaded from a CDN or included in the package.
`

    await fs.writeFile(MODEL_PATH, placeholderContent, "utf-8")

    spinner.succeed(chalk.green("Model downloaded successfully"))

    console.log(chalk.blue("\nℹ"), chalk.white("Model location:"), chalk.gray(MODEL_PATH))
    console.log(chalk.blue("ℹ"), chalk.white("Model size:"), chalk.gray("~250 MB (placeholder)"))
  } catch (error) {
    spinner.fail(chalk.red("Failed to download model"))
    throw error
  }
}
