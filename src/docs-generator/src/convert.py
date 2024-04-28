import glob


def process_file(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        line.rstrip()
        if line.startswith('{% tabs'):
            line = '<tabs>'
        elif line.startswith('{% tab'):
            name = line.split(' ')[3]
            line = f'<tab name="{name}">\n'
        elif line.startswith('{% endtab %}'):
            line = '</tab>'
        elif line.startswith('{% endtabs %}'):
            line = '</tabs>'
        new_lines.append(line)

def main():
    files = glob.glob('./**/*.md')
    for file in files:
        process_file(file)


if __name__ == '__main__':
    main()
