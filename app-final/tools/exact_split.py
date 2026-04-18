import json
import os
import re

def clean_text(text):
    if not text: return ""
    # Strip Telugu Unicode Range: \u0C00 - \u0C7F
    text = re.sub(r'[\u0C00-\u0C7F]+', ' ', text)
    # Collapse multiple spaces and trim
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def exact_split():
    # Paths
    json_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../questions.json"))
    output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public/data/questions"))
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    test_ids = [
        '2024-s1', '2024-s2', '2023-s1', '2023-s2', '2022-s1', 
        'mock-ebook', '2022-s2', '2021-s1', '2021-s2', '2021-s3', 
        '2021-s4', '2020-s1', '2020-s2', '2020-s3', '2019-s1',
        '2019-s2', 'model-2025', 'sample-2026'
    ]
    # Add practice sets until we reach 31 or run out of questions
    for i in range(1, 14):
        test_ids.append(f"practice-{i}")

    with open(json_path, 'r', encoding='utf-8') as f:
        all_questions = json.load(f)

    print(f"Loaded {len(all_questions)} questions from master JSON.")

    chunk_size = 90
    for i, test_id in enumerate(test_ids):
        start = i * chunk_size
        end = start + chunk_size
        
        paper_questions = all_questions[start:end]
        
        if not paper_questions:
            print(f"No more questions for {test_id}. Stop.")
            break

        # Clean and Transform
        cleaned_paper = []
        for idx, q in enumerate(paper_questions):
            q['text'] = clean_text(q['text'])
            
            raw_options = q.get('options', [])
            formatted_options = []
            for o_idx, o_text in enumerate(raw_options):
                formatted_options.append({
                    "id": str(o_idx + 1),
                    "text": clean_text(str(o_text))
                })
            q['options'] = formatted_options
            q['correctAnswer'] = str(q.get('correct', 0) + 1)
            q['id'] = str(idx + 1)
            cleaned_paper.append(q)

        output_path = os.path.join(output_dir, f"{test_id}.json")
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(cleaned_paper, f, indent=4)
        
        print(f"[{i+1}/30] Saved {len(cleaned_paper)} cleaned questions to {test_id}.json")

if __name__ == "__main__":
    exact_split()
