import { AlertCircle, Shield, Lock } from "lucide-react"

// Define module data structure
export interface ModuleData {
  id: string
  title: string
  description: string
  icon: any
  color: string
  overview?: string
  objectives?: string[]
  tasks: ModuleTask[]
}

export interface ModuleTask {
  id: number
  title: string
  description: string
  difficulty: {
    [key: string]: {
      instructions: string
      hints: string[]
      solution: string
    }
  }
}

// Module data
const moduleData: Record<string, ModuleData> = {
  phishing: {
    id: "phishing",
    title: "Phishing Awareness",
    description: "Learn to identify and defend against phishing attacks",
    icon: AlertCircle,
    color: "from-red-500 to-orange-500",
    overview:
      "Phishing attacks are one of the most common and effective methods used by cybercriminals to steal sensitive information. This module will teach you how to identify and respond to phishing attempts.",
    objectives: [
      "Identify common indicators of phishing emails",
      "Analyze email headers to trace the origin of suspicious messages",
      "Develop proper response procedures for suspected phishing attempts",
    ],
    tasks: [
      {
        id: 1,
        title: "Identify Phishing Email",
        description: "Analyze the provided email and identify phishing indicators",
        difficulty: {
          beginner: {
            instructions:
              "Run 'analyze-email' to view the suspicious email, then use 'identify-indicators' to list the phishing signs you found.",
            hints: [
              "Check the sender's email address",
              "Look for urgency in the message",
              "Examine the URL in the email",
            ],
            solution: "identify-indicators sender-address url-mismatch urgency spelling-errors",
          },
          intermediate: {
            instructions:
              "Run 'analyze-email' to view the suspicious email, then use 'identify-indicators' to list all phishing signs.",
            hints: ["Check for technical inconsistencies"],
            solution: "identify-indicators sender-address url-mismatch urgency spelling-errors request-credentials",
          },
          advanced: {
            instructions:
              "Run 'analyze-email' to view the suspicious email, then use 'identify-indicators' with all phishing signs without hints.",
            hints: [],
            solution:
              "identify-indicators sender-address url-mismatch urgency spelling-errors request-credentials spoofed-domain",
          },
        },
      },
      {
        id: 2,
        title: "Email Header Analysis",
        description: "Examine email headers to trace the origin of a phishing attempt",
        difficulty: {
          beginner: {
            instructions:
              "Run 'show-headers' to view the email headers, then use 'trace-origin' to identify the true source.",
            hints: ["Look at the 'Received:' fields", "Check for IP addresses that don't match the claimed sender"],
            solution: "trace-origin 192.168.1.100",
          },
          intermediate: {
            instructions:
              "Run 'show-headers' to view the email headers, then use 'trace-origin' with the source IP and country code.",
            hints: ["Use 'geolocate' to find the country code"],
            solution: "trace-origin 192.168.1.100 RU",
          },
          advanced: {
            instructions:
              "Analyze the headers with 'show-headers' and use 'full-trace' to map the complete path of the email.",
            hints: [],
            solution: "full-trace 192.168.1.100 RU 103.45.67.89 CN",
          },
        },
      },
      {
        id: 3,
        title: "Secure Response",
        description: "Practice the proper response to a suspected phishing attempt",
        difficulty: {
          beginner: {
            instructions: "Use 'respond-to-phishing' with the appropriate actions to take.",
            hints: ["Don't click links", "Report to IT security", "Don't reply to the sender"],
            solution: "respond-to-phishing report-to-security do-not-click do-not-reply",
          },
          intermediate: {
            instructions: "Create a complete security response plan using 'create-response-plan'.",
            hints: ["Include user education"],
            solution: "create-response-plan report-to-security do-not-click do-not-reply isolate-system update-filters",
          },
          advanced: {
            instructions: "Implement a full organizational response with 'org-response'.",
            hints: [],
            solution:
              "org-response report-to-security do-not-click do-not-reply isolate-system update-filters company-alert forensic-analysis",
          },
        },
      },
    ],
  },
  network: {
    id: "network",
    title: "Network Security",
    description: "Understand network vulnerabilities and implement protections",
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
    overview:
      "Network security is essential for protecting organizational infrastructure from unauthorized access and attacks. This module covers fundamental network security concepts and practical defense techniques.",
    objectives: [
      "Perform network scanning to identify potential vulnerabilities",
      "Configure firewall rules to protect against unauthorized access",
      "Set up and test intrusion detection systems",
    ],
    tasks: [
      {
        id: 1,
        title: "Network Scanning",
        description: "Scan a network to identify active hosts and open ports",
        difficulty: {
          beginner: {
            instructions: "Use 'scan-network' to identify active hosts on the subnet.",
            hints: ["Try the 192.168.1.0/24 subnet", "Look for hosts with port 22 open"],
            solution: "scan-network 192.168.1.0/24",
          },
          intermediate: {
            instructions: "Perform a comprehensive port scan on the target host.",
            hints: ["Use scan-ports with the target IP"],
            solution: "scan-ports 192.168.1.10 --all",
          },
          advanced: {
            instructions: "Conduct a stealth scan and identify service versions.",
            hints: [],
            solution: "stealth-scan 192.168.1.10 --service-detection",
          },
        },
      },
      {
        id: 2,
        title: "Firewall Configuration",
        description: "Configure a firewall to protect against unauthorized access",
        difficulty: {
          beginner: {
            instructions: "Use 'configure-firewall' to block incoming connections to port 23 (telnet).",
            hints: ["Block incoming traffic", "Specify port 23"],
            solution: "configure-firewall --block incoming --port 23",
          },
          intermediate: {
            instructions: "Create a firewall rule to allow only specific IPs to access SSH.",
            hints: ["Allow only from trusted networks"],
            solution: "configure-firewall --allow incoming --port 22 --source 10.0.0.0/8",
          },
          advanced: {
            instructions: "Implement a complete firewall ruleset for a web server.",
            hints: [],
            solution:
              "configure-firewall --ruleset webserver --allow incoming --port 80,443 --rate-limit 100/min --block incoming --port 0-79,81-442,444-65535",
          },
        },
      },
      {
        id: 3,
        title: "Intrusion Detection",
        description: "Set up and test an intrusion detection system",
        difficulty: {
          beginner: {
            instructions: "Use 'setup-ids' to configure basic intrusion detection.",
            hints: ["Enable signature-based detection", "Monitor port 80"],
            solution: "setup-ids --mode signature --monitor-port 80",
          },
          intermediate: {
            instructions: "Configure IDS with custom rules and test with simulated attack.",
            hints: ["Add rules for SQL injection detection"],
            solution: "setup-ids --mode hybrid --add-rule sql-injection --test-detection",
          },
          advanced: {
            instructions: "Implement a comprehensive IDS/IPS system with automated responses.",
            hints: [],
            solution:
              "setup-ids --mode advanced --behavior-analysis --auto-response --add-rule sql-injection,xss,csrf --log-level verbose",
          },
        },
      },
    ],
  },
  crypto: {
    id: "crypto",
    title: "Cryptography Basics",
    description: "Learn encryption fundamentals and secure communications",
    icon: Lock,
    color: "from-purple-500 to-pink-500",
    overview:
      "Cryptography is the foundation of secure digital communications. This module introduces you to encryption concepts, hash functions, and secure communication protocols.",
    objectives: [
      "Understand and apply basic encryption and decryption techniques",
      "Learn about cryptographic hash functions and their security implications",
      "Set up secure communication channels using modern protocols",
    ],
    tasks: [
      {
        id: 1,
        title: "Encryption Basics",
        description: "Practice basic encryption and decryption techniques",
        difficulty: {
          beginner: {
            instructions: "Use 'encrypt' to encrypt the message 'secret' with the key 'key123'.",
            hints: ["Specify the algorithm as AES", "Format: encrypt <message> <key> <algorithm>"],
            solution: "encrypt secret key123 aes",
          },
          intermediate: {
            instructions: "Encrypt a message with AES-256 and then decrypt it.",
            hints: ["Use decrypt after encryption"],
            solution:
              "encrypt 'confidential data' strong-key-123 aes-256 && decrypt <encrypted-output> strong-key-123 aes-256",
          },
          advanced: {
            instructions: "Implement asymmetric encryption with RSA key generation and message exchange.",
            hints: [],
            solution:
              "generate-keypair rsa 2048 && encrypt-asymmetric 'top secret' public.key && decrypt-asymmetric <encrypted-output> private.key",
          },
        },
      },
      {
        id: 2,
        title: "Hash Functions",
        description: "Understand and use cryptographic hash functions",
        difficulty: {
          beginner: {
            instructions: "Generate an MD5 hash of the string 'password'.",
            hints: ["Use the hash command", "Specify MD5 as the algorithm"],
            solution: "hash password md5",
          },
          intermediate: {
            instructions: "Compare the security of different hash algorithms by generating multiple hashes.",
            hints: ["Try SHA-256 and SHA-512"],
            solution: "hash password md5 && hash password sha256 && hash password sha512 && compare-hashes",
          },
          advanced: {
            instructions: "Demonstrate a hash collision in MD5 and explain why it's insecure.",
            hints: [],
            solution: "find-collision md5 && explain-vulnerability md5-collision",
          },
        },
      },
      {
        id: 3,
        title: "Secure Communication",
        description: "Set up a secure communication channel",
        difficulty: {
          beginner: {
            instructions: "Establish a secure connection using 'secure-connect' with TLS.",
            hints: ["Specify the protocol as TLS", "Use port 443"],
            solution: "secure-connect --protocol tls --port 443",
          },
          intermediate: {
            instructions: "Configure perfect forward secrecy in your TLS connection.",
            hints: ["Add the PFS option"],
            solution: "secure-connect --protocol tls --port 443 --cipher ECDHE-RSA-AES256-GCM-SHA384 --pfs",
          },
          advanced: {
            instructions: "Implement a complete secure messaging system with end-to-end encryption.",
            hints: [],
            solution:
              "setup-e2ee --protocol signal --generate-keys --authenticate-recipient --establish-session --send-message 'This is secure' --verify-delivery",
          },
        },
      },
    ],
  },
}

// Function to get module data
export function getModuleData(moduleId: string): ModuleData | null {
  return moduleData[moduleId] || null
}

// Function to get all modules
export function getAllModules(): ModuleData[] {
  return Object.values(moduleData)
}

