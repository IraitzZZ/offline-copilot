/**
 * Branding utilities - Logo and branding elements
 * Created by IraitzZZ
 */

import chalk from "chalk"

/**
 * Show Offline Copilot logo
 */
export function showLogo(): void {
  const logo = `
${chalk.red("  ╔═══════════════════════════════════════╗")}
${chalk.red("  ║")}  ${chalk.white("OFFLINE COPILOT")}                   ${chalk.red("║")}
${chalk.red("  ║")}  ${chalk.blue("100% Local AI Coding Assistant")}    ${chalk.red("║")}
${chalk.red("  ╚═══════════════════════════════════════╝")}
${chalk.gray("           Powered by IraitzZZ")}
`
  console.log(logo)
}

/**
 * Get branded message
 */
export function brandedMessage(message: string, type: "info" | "success" | "error" | "warning" = "info"): string {
  const icons = {
    info: chalk.blue("ℹ"),
    success: chalk.green("✓"),
    error: chalk.red("✗"),
    warning: chalk.yellow("⚠"),
  }

  return `${icons[type]} ${chalk.white(message)}\n${chalk.gray("Powered by IraitzZZ")}`
}
