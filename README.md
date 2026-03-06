# GPT-5 Mini Playground

> [!IMPORTANT]
> Please follow the [Hack Club AI Rules](https://docs.ai.hackclub.com/guide/rules.html).

Test GPT-5 Mini! GPT-5 Mini is a compact version of GPT-5, designed to handle lighter-weight reasoning tasks. It provides the same instruction-following and safety-tuning benefits as GPT-5, but with reduced latency and cost. GPT-5 Mini is the successor to OpenAI's o4-mini model. Inspired by <https://platform.openai.com/playground>

This is a large language model that "thinks" for a while, so please expect slower responses.

I thank [Flexbox Froggy](https://flexboxfroggy.com/) for teaching me how to use CSS flex.

## Input fields

* System prompt: The instructions given for the model to follow.
   * Example: You are a helpful assistant.
* Your message: The query you decide to use.
   * Example: Is "dog" or "park" the subject of the sentence, "The dog walked in the park."?
* Response from GPT-5 Mini: The model's output.

## Hosting locally

1. Create an API key on [Hack Club AI](https://ai.hackclub.com/) and copy it
2. Clone the repo:
   ```sh
   git clone https://github.com/46009361/GPT-5-Mini-Playground.git
   ```
3. In the root folder, add another folder called `auth`
4. Within that folder, add a `bearer.php` file with the following contents (an environment variable is recommended):
   ```php
   <?php
   $HACKCLUB_AI_API_KEY = 'YOUR_API_KEY'
   ?>
   ```
5. Deploy on a server supporting PHP
6. Done!