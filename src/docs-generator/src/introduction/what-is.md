# What is pointw?

<script setup>
import { useData } from 'vitepress'

const { frontmatter, page, theme } = useData()
</script>

## theme
<pre>{{ theme }}</pre>

## frontmatter
<pre>{{ frontmatter }}</pre>

## page
<pre>{{ page }}</pre>

