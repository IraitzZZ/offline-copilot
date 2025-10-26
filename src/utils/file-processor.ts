/**
 * File Processor - Extract and apply code changes
 * Created by IraitzZZ
 */

export interface CopilotComment {
  line: number
  instruction: string
  fullComment: string
}

/**
 * Extract @copilot comments from file content
 */
export function extractCopilotComments(content: string): CopilotComment[] {
  const lines = content.split("\n")
  const comments: CopilotComment[] = []

  // Regex patterns for different comment styles
  const patterns = [
    /\/\/\s*@copilot:\s*(.+)/i, // JavaScript/TypeScript: // @copilot: ...
    /#\s*@copilot:\s*(.+)/i, // Python/Shell: # @copilot: ...
    /\/\*\s*@copilot:\s*(.+)\s*\*\//i, // Multi-line: /* @copilot: ... */
  ]

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      const match = line.match(pattern)
      if (match) {
        comments.push({
          line: index + 1,
          instruction: match[1].trim(),
          fullComment: line.trim(),
        })
        break
      }
    }
  })

  return comments
}

/**
 * Apply generated code changes to file content
 */
export function applyChanges(
  content: string,
  changes: Array<{ line: number; instruction: string; generatedCode: string }>,
): string {
  const lines = content.split("\n")

  // Sort changes by line number in reverse order to maintain line numbers
  const sortedChanges = [...changes].sort((a, b) => b.line - a.line)

  for (const change of sortedChanges) {
    // Insert generated code after the @copilot comment
    const insertIndex = change.line
    const indent = getIndentation(lines[change.line - 1])
    const indentedCode = change.generatedCode
      .split("\n")
      .map((line) => indent + line)
      .join("\n")

    lines.splice(insertIndex, 0, indentedCode)
  }

  return lines.join("\n")
}

/**
 * Get indentation from a line
 */
function getIndentation(line: string): string {
  const match = line.match(/^(\s*)/)
  return match ? match[1] : ""
}
