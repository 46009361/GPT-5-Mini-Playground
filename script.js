// test commit

const messages = document.forms.messages;
messages.addEventListener("submit", async function(event) {
    event.preventDefault();
    const s = document.querySelector("#s");
    s.disabled = true;
    s.innerText = "▶ Running…";
    const arr = [];
    Array.from(messages).forEach(element => {
        if (!element.disabled && element.name) {
            const obj = {};
            obj.role = element.name;
            obj.content = element.value;
            arr.push(obj);
        }
    });
    const response = await fetch("./letschat/",
        {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({model: "openai/gpt-5-mini", messages: arr, stream: true})
        }
    );
    try {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";
        messages.assistant.value = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop();

            for (const line of lines) {
                if (!line.startsWith("data:")) continue;

                const jsonStr = line.slice(5).trim();
                if (jsonStr === "[DONE]") continue;

                let json;
                try {
                    json = JSON.parse(jsonStr);
                }
                catch {
                    continue;
                }
                if (json.model && !document.querySelector("#model").innerText) {
                    document.querySelector("#model").innerText =
                        `The current model is: ${json.model.split(/\//)[1]}`;
                }
                const token = json?.choices?.[0]?.delta?.content;
                if (token) {
                    messages.assistant.value += token;
                }
            }
        }
    }
    catch (error) {
        alert(error);
    }
    finally {
        s.innerText = "▶ Run";
        s.disabled = false;
        return true;
    }
});
