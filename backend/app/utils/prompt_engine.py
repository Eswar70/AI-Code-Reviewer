class PromptEngine:
    @staticmethod
    def get_review_prompt(code: str, language: str) -> str:
        return f"""
        You are a Senior Software Architect and Full-Stack AI Engineer with 20+ years of experience.
        Your task is to perform a production-grade code review for the following {language} code.

        CODE:
        ```{language}
        {code}
        ```

        Provide your review in a structured JSON format with the following keys:
        1. "bugs": A list of detected functional bugs.
        2. "security_issues": A list of vulnerabilities.
        3. "performance_issues": A list of bottlenecks.
        4. "suggestions": Best practice recommendations.
        5. "refactored_code": A complete, refactored version.

        CRITICAL RULES:
        - DO NOT use any markdown formatting (like **bold**) inside the JSON strings. 
        - Keep descriptions concise, professional, and architectural.
        - Ensure the response is ONLY a valid JSON object.
        """

    @staticmethod
    def get_system_instruction() -> str:
        return "You are a senior code reviewer. You provide critical, architectural-level feedback and high-quality refactors."
