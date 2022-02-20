module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    shorten_string: postText => {
      const newString = postText.substring(0, 199)
      return `${newString}...`;
    }
  }